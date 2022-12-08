import { useState } from "react";
import DataTable from "react-data-table-component";
import { Image, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import useFirebaseInventory from "../hooks/useFirebaseInventory";
import { useAllFirebaseGlassData } from "../hooks/useFirebaseGlassData";
import InlineMaterialForm from "../components/InlineMaterialForm";
import {
  createInventoryItem,
  editInventoryItem,
  deleteInventoryItem,
} from "../actions";
import { glassImage } from "../helpers/logoHelpers";
import { getHexColor } from "../helpers/glassHelpers";

const InventoryPage = () => {
  const default_form_values = {
    description: "",
    glass_reference: "",
    glass_type: "Bullseye",
    count: "1",
  };
  const [form_initial_values, setFormInitialValues] =
    useState(default_form_values);
  const columns = [
    {
      name: "Manufacturer",
      selector: "manufacturer",
      sortable: true,
      cell: (row) => <Image size="mini" src={glassImage(row.glass_type)} />,
    },
    {
      name: "Code",
      selector: "glass_reference",
      sortable: true,
      cell: (row) => <div>{row.glass_reference}</div>,
    },
    {
      name: "Colour",
      selector: "color",
      sortable: false,
      cell: ({ color }) => (
        <span
          style={{
            color: color?.multicolored ? "black" : getHexColor(color?.rgb),
            fontSize: color?.multicolored ? 18 : 32,
          }}
        >
          {" "}
          {color?.multicolored ? (
            <span>Multicoloured</span>
          ) : (
            color && <Icon name="square full" />
          )}
        </span>
      ),
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
      cell: (row) => <div>{row.type}</div>,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      cell: (row) => <div>{row.description}</div>,
    },
    {
      name: "Quantity",
      selector: "count",
      sortable: true,
      cell: (row) => (
        <div>
          <Icon name="minus" onClick={() => changeQuantity(-1, row.id)} />
          {row.count}
          <Icon name="plus" onClick={() => changeQuantity(1, row.id)} />
        </div>
      ),
    },
    {
      name: "",
      selector: "buttons",
      sortable: false,
      cell: (row) => (
        <div>
          <Icon name="edit" onClick={() => editRow(row.id)} />
        </div>
      ),
    },
  ];

  const inventory = useFirebaseInventory();
  const all_glass_data = useAllFirebaseGlassData();
  const dispatch = useDispatch();

  const changeQuantity = (increment, id) => {
    const new_item = { ...inventory?.[id] };
    const count = Number(new_item.count);
    new_item.count = (!Number.isNaN(count) ? count + increment : 0).toString();
    if (new_item.count == 0) {
      dispatch(deleteInventoryItem(id));
    } else {
      dispatch(editInventoryItem(id, new_item));
    }
  };

  const editRow = (id) => {
    console.log("EditRow called against: ", id, "Passing: ", inventory?.[id]);
    setFormInitialValues(inventory?.[id]);
  };
  const inventory_array = inventory && Object.values(inventory);
  // Enrich the array by handling descriptions properly
  const enriched_inventory_array = inventory_array?.map((item) => {
    const new_item = { ...item };
    if (new_item.glass_reference) {
      const glass_item =
        all_glass_data?.[item.glass_type]?.inventory?.[item.glass_reference];
      new_item.description = new_item.description
        ? glass_item?.description + "-" + new_item.description
        : glass_item?.description;
      new_item.type = glass_item?.type;
      new_item.color = glass_item?.color;
    }
    return new_item;
  });
  //console.log("Inventory", inventory_array);
  console.log(form_initial_values);

  const handleSubmit = (formValues) => {
    console.log("submitting:", formValues);
    if (!form_initial_values.id) {
      dispatch(createInventoryItem(formValues));
    } else {
      console.log("Editing!");
      dispatch(editInventoryItem(form_initial_values.id, formValues));
    }
    setFormInitialValues(default_form_values);
  };
  return (
    <>
      <div>This is the inventory page</div>
      {inventory && (
        <DataTable
          title="Inventory"
          columns={columns}
          data={enriched_inventory_array}
          defaultSortField="code"
          dense={true}
        />
      )}
      <InlineMaterialForm
        onSubmit={handleSubmit}
        initialValues={form_initial_values}
      />
    </>
  );
};

export default InventoryPage;