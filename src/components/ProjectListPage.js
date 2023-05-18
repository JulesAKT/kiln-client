import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Card, Icon, Button, Image, Rating } from "semantic-ui-react";
import DataTable from "react-data-table-component";

import useFirebaseKilns from "../hooks/useFirebaseKilns";
import useFirebaseProjects from "../hooks/useFirebaseProjects";
import useFirebasePreferences from "../hooks/useFirebasePreferences";
import history from "../history";
import ProjectCard from "./ProjectCard";
import { convertLengthUnit } from "../helpers/unitHelpers";
import { findSuitablePhoto } from "../helpers/photoHelpers";

const ProjectListPage = ({ navigation }) => {
  const [detail, setDetail] = useState(false);
  const preferences = useFirebasePreferences();

  const desired_unit = (preferences && preferences.length_unit) || "mm";

  const projects = useFirebaseProjects();

  const kilns = useFirebaseKilns();

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

  const unsorted_project_array = projects && Object.values(projects);

  const project_array = unsorted_project_array?.sort((a,b)=> a?.name.toLowerCase().localeCompare(b?.name.toLowerCase()));

  const columns = [
    {
      name: "Photo",
      selector: "photo",
      sortable: false,
      cell: (row) => (
        <Image size="mini" src={findSuitablePhoto(row, "small").uri} />
      ),
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
          {convertLengthUnit(row.length_unit, desired_unit, row.width)}x
          {convertLengthUnit(row.length_unit, desired_unit, row.depth)}x
          {convertLengthUnit(row.length_unit, desired_unit, row.thickness)}(
          {desired_unit})
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
    {
      name: "Rating",
      selector: "rating",
      sortable: true,
      cell: (row) => (
        <div>
          <Rating maxRating={5} rating={row.stars} disabled={true} />
        </div>
      ),
    },
  ];
  //console.log(project_array);
  return (
    <div>
      {renderDetailButton()}
      {detail ? (
        project_array && (
          <DataTable
            title="Projects"
            columns={columns}
            data={project_array}
            defaultSortField="name"
            onRowClicked={(row) => {
              history.push(`/projects/${row.id}`);
            }}
          />
        )
      ) : (
        <Card.Group>
          {project_array &&
            project_array.map(
              (item) =>
                item && (
                  <ProjectCard
                    {...item}
                    key={item.id}
                    kilnName={kilns && kilns[item.kiln]?.name}
                  />
                )
            )}

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

export default ProjectListPage;
