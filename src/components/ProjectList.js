import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Icon, Button, Image } from "semantic-ui-react";
import DataTable from "react-data-table-component";
import { fetchProjects, fetchKilns } from "../actions";
import history from "../history";
import ProjectCard from "../components/ProjectCard";

const ProjectList = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchKilns());
  }, [dispatch]);
  const [detail, setDetail] = useState(false);

  const projects = useSelector((state) => state.projects);
  const kilns = useSelector((state) => state.kilns);

  if (!projects) {
    return <div>Loading...</div>;
  }

  const renderDetailButton = () => {
    return detail ? (
      <Button.Group>
        <Button onClick={() => setDetail(false)}>Cards</Button>
        <Button.Or />
        <Button positive>Detail</Button>
      </Button.Group>
    ) : (
      <Button.Group>
        <Button positive>Cards</Button>
        <Button.Or />
        <Button onClick={() => setDetail(true)}>Detail</Button>
      </Button.Group>
    );
  };

  const project_array = Object.values(projects);

  const columns = [
    {
      name: "Photo",
      selector: "photo",
      sortable: false,
      cell: (row) => <Image avatar src={row.photo} />,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (row) => <div>{row.name}</div>,
    },
    {
      name: "Size",
      selector: "size",
      sortable: true,
      sortFunction: (a, b) => {
        return a.width * a.depth * a.thickness > b.width * b.depth * b.thickness
          ? -1
          : 1;
      },
      cell: (row) => (
        <div>
          {row.width}x{row.depth}x{row.thickness}(mm)
        </div>
      ),
    },
    {
      name: "Kiln",
      selector: "kiln",
      sortable: true,
      cell: (row) => <div>{kilns[row.kiln].name}</div>,
    },
    {
      name: "Glass Type",
      selector: "glass",
      sortable: true,
      cell: (row) => <div>{row.glass}</div>,
    },
  ];
  //console.log(project_array);
  return (
    <div>
      {renderDetailButton()}
      {detail ? (
        <DataTable
          title="Projects"
          columns={columns}
          data={project_array}
          defaultSortField="name"
          onRowClicked={(row) => {
            history.push(`/projects/${row.id}`);
          }}
        />
      ) : (
        <Card.Group>
          {project_array.map((item) => (
            <ProjectCard {...item} key={item.id} />
          ))}

          <Card as={Link} to={`/new_project`}>
            <Card.Header>Add New Project</Card.Header>
            <Card.Content extra>
              <Icon name="plus" size="massive" />
            </Card.Content>
          </Card>
        </Card.Group>
      )}
    </div>
  );
};

export default ProjectList;
