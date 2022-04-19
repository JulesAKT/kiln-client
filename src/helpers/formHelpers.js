import React from "react";
import BaseDatePicker, {
  registerLocale,
  setDefaultLocale,
} from "react-datepicker";

//import { DateTimePicker } from "react-widgets";
import { Image, List } from "semantic-ui-react";
import { useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { omit } from "lodash";
import styled from "styled-components";

import {
  Form,
  TextArea as SemanticTextArea,
  Rating,
  Label,
  Dropdown,
} from "semantic-ui-react";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

import "react-datepicker/dist/react-datepicker.css";
import "react-widgets/dist/css/react-widgets.css";

import { enGB } from "date-fns/locale";

registerLocale("en-GB", enGB);
setDefaultLocale("en-GB");

Moment.locale("en-GB");
momentLocalizer();

export const renderError = ({ error, warning, touched }) => {
  return (
    <div className="ui error message">
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export const renderHookError = (errors, name) => {
  return (
    <div className="ui error message">
      {errors[name] && <span>{errors[name]}</span>}
    </div>
  );
};

export const renderFieldArray = ({ fields, innerComponent }) => (
  <List>
    {fields.map(innerComponent)}
    <button type="button" onClick={() => fields.push({})}>
      Add Image
    </button>
  </List>
);
/*
export const ImageInput = ({ input, label, meta }) => {
  const [imageURL, setImageURL] = useState(
    input.value ? input.value : require("../assets/icon.png")
  );
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  const photo_url = input.value;
  //console.log(photo_url);
  delete input.value; // Can't render a file input box with a non-null default value
  const handleChange = (event) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    console.log("handlingChange");
    console.log(imageFile);
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      console.log(`setting to: ${localImageUrl}`);
      setImageURL(localImageUrl);

      console.log(localImageUrl);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        input.onChange(imageFile);
        //URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
    }
  };
  console.log(imageURL);
  return (
    <div className={className}>
      <label>{label}</label>
      <Image src={imageURL} size="small" />
      <input
        type="file"
        onChange={(event) => {
          console.log("OnChange!");
          handleChange(event, input);
        }}
        {...input}
      />
      {renderError(meta)}
    </div>
  );
};
*/

export const HookImageInput = ({ control, name, ...props }) => {
  //console.log("HookInput");
  //console.log(props);
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: props.defaultValue,
  });
  const img = inputProps.value;
  let photo_url = img;
  console.log(img);

  if (typeof img === "object") {
    console.log(`Is An Object! ${img.length}`);
    console.log(inputProps.value);
    //    if (img.length) {
    console.log("Has Length");
    console.log(img);
    photo_url = URL.createObjectURL(img);
    console.log("PhotoURL");
    console.log(photo_url);
    URL.revokeObjectURL(img[0]);
  }
  /* } else {
    photo_url = require("../assets/icon.png").default;
  } */

  delete inputProps.value; // Can't render a file input box with a non-null default value
  const handleChange = (event) => {
    event.preventDefault();
    console.log(event);
    let imageFile = event.target.files[0];
    console.log(imageFile);
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      console.log(localImageUrl);
      const imageObject = new window.Image();
      imageObject.onload = () => {
        console.log(imageObject);
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        inputProps.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
    }
  };
  //console.log(inputProps);
  return (
    <>
      <div>
        <label id={name}></label>
        <Image
          src={photo_url}
          size="small"
          label={{ floating: true, icon: "edit", circular: true }}
        ></Image>
        <input
          type="file"
          {...omit(inputProps, ["onChange"])}
          onChange={(event) => handleChange(event)}
          accept=".jpg,.jpeg,.gif,.png,.heic"
          id={name}
          style={{ opacity: 0 }}
        />
      </div>
      <ErrorMessage
        errors={props.errors}
        name={name}
        render={({ message }) => (
          <div className="ui error message">
            <span>{message}</span>
          </div>
        )}
      />
    </>
  );
};

export const ImageInput = ({ input, label, meta }) => {
  //const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  let photo_url = input.value;
  //console.log(typeof input.value);
  //console.log(input.value);
  if (typeof input.value === "object") {
    if (input.value.length) {
      //console.log(input.value);
      photo_url = URL.createObjectURL(input.value[0]);
      URL.revokeObjectURL(input.value[0]);
    } else {
      photo_url = require("../assets/icon.png").default;
    }
  }
  //const photo_url = input.value;

  //console.log(photo_url);
  delete input.value; // Can't render a file input box with a non-null default value
  const handleChange = (event) => {
    //console.log("Handling change");
    event.preventDefault();
    let imageFile = event.target.files[0];
    //console.log(imageFile);
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      //console.log(localImageUrl);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        input.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
    }
  };
  return (
    <>
      <List.Icon>
        <div>
          <label id={input.name}>
            <Image
              src={photo_url}
              size="small"
              label={{ floating: true, icon: "edit", circular: true }}
            ></Image>
            <input
              type="file"
              onChange={(event) => handleChange(event)}
              {...input}
              accept=".jpg,.jpeg,.gif,.png,.heic"
              id={input.name}
              style={{ opacity: 0 }}
            />
          </label>
        </div>
        {renderError(meta)}
      </List.Icon>
    </>
  );
};

export const FileInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  const photo_url = input.value;
  //console.log(photo_url);
  delete input.value; // Can't render a file input box with a non-null default value
  const handleChange = (event) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    //console.log(imageFile);
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      //console.log(localImageUrl);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        input.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
    }
  };
  return (
    <div className={className}>
      <label>{label}</label>
      <Image src={photo_url} size="small" />
      <input type="file" onChange={(event) => handleChange(event)} {...input} />
      {renderError(meta)}
    </div>
  );
};

export const HookInput = ({ control, name, ...props }) => {
  //console.log("HookInput");
  //console.log(props);
  const {
    field: { ref, ...inputProps },
    meta: { isTouched },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: props.defaultValue,
  });

  const className = `field ${props.inline && "inline"} ${
    props.errors[name] && isTouched ? "error" : ""
  }`;
  //console.log(props.errors[name]);
  const fieldError = props.errors[name] ? props.errors[name].message : false;
  return (
    <div className={className}>
      {props.multiline ? (
        <>
          <Form.TextArea
            {...inputProps}
            label={props.label}
            rows={props.numberOfLines}
          />
        </>
      ) : (
        <Form.Input label={props.label} error={fieldError} {...inputProps}>
          <input type={props.type} />
          {props.rightLabel && <Label basic>{props.rightLabel}</Label>}
        </Form.Input>
      )}
    </div>
  );
};
/* 
export const OldHookInput = ({control, name, errors, ..inputProps}) => {
  const className = `field ${
    errors[name] && touched[name]
      ? "error"
      : ""
  }`;
  const { field: {ref, ...inputProps}, meta: {invalud, isTouched, isDirty}}
  return (
    <div className={className}>
      <label>{inputProps.label}</label>
      <Controller {...inputProps} as={input} />
      {renderHookError(errors,name)}
    </div>
  );
};
*/
export const Input = ({ input, type, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} type={type} />
      {renderError(meta)}
    </div>
  );
};

export const tinyRenderInput = ({ input, type, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <input
        {...input}
        type={type}
        size={16}
        style={{
          textAlign: "center",
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      />
    </div>
  );
};

export const TextArea = ({ input, type, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <SemanticTextArea {...input} type={type} />
      {renderError(meta)}
    </div>
  );
};

export const DatePicker = ({ control, name, label, ...props }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
    //    defaultValue: props.defaultValue,
  });

  return (
    <Form.Field

    //defaultChecked={props.defaultValue}
    >
      <label>{label}</label>
      <BaseDatePicker
        local="en-GB"
        dateFormat="dd MMM yyyy"
        selected={!inputProps.value ? null : new Date(inputProps.value)}
        onChange={inputProps.onChange}
      />
    </Form.Field>
  );
};

/* 
export const renderDatePicker = ({
  input: { onChange, value },
  label,
  meta,
}) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <div>
        <DatePicker
          locale="en-GB"
          dateFormat="dd/MM/yyyy"
          onChange={onChange}
          format="YYYY-MM-DD"
          selected={!value ? null : new Date(value)}
        />
      </div>
      {renderError(meta)}
    </div>
  );
};

export const renderDateTimePicker = ({
  input: { onChange, value },
  label,
  meta,
}) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  //console.log(value);
  return (
    <div className={className}>
      <label>{label}</label>
      <DateTimePicker onChange={onChange} value={value} />
      {renderError(meta)}
    </div>
  );
};
*/

// Override Dropdown styling to sort the searchable icon out. See: https://github.com/Semantic-Org/Semantic-UI-React/issues/3869

const StyledDropDown = styled(Dropdown)`
  &&&& {
    .icon {
      z-index: 2;
    }
  }
`;

export const HookDropdown = ({
  control,
  name,
  label,
  errors,
  options,
  text,
  icon,
  renderLabel,
  placeholder,
  search = false,
  ...props
}) => {
  //console.log("HookDropdown");
  //console.log(props);
  const {
    field: { ref, ...inputProps },
    meta: { isTouched },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: props.defaultValue,
  });
  const className = `field ${errors[name] && isTouched ? "error" : ""}`;
  //console.log(inputProps);
  return (
    <div className={className}>
      <label style={props.labelStyle}>{label}</label>
      <StyledDropDown
        {...inputProps}
        onChange={(e, { value }) => {
          inputProps.onChange(value);
        }}
        options={options}
        text={text}
        icon={icon}
        search={search}
        style={props.selectStyle}
        renderLabel={renderLabel}
        placeholder={placeholder}
        clearable
      ></StyledDropDown>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <div className="ui error message">
            <span>{message}</span>
          </div>
        )}
      />
    </div>
  );
};

export const HookSelect = ({
  control,
  name,
  label,
  items,
  errors,
  ...props
}) => {
  //console.log("HookSelect");
  //console.log(props);
  const {
    field: { ref, ...inputProps },
    meta: { isTouched },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: props.defaultValue,
  });

  const className = `field ${errors[name] && isTouched ? "error" : ""}`;
  return (
    <div className={className}>
      <label style={props.labelStyle}>{label}</label>
      <select {...inputProps} style={props.selectStyle}>
        {items.map(({ label, value }) => {
          return (
            <option value={value} key={value}>
              {label}
            </option>
          );
        })}
      </select>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <div className="ui error message">
            <span>{message}</span>
          </div>
        )}
      />
    </div>
  );
};

export const Select = ({ input, label, meta, rooms, items }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  console.log(input);
  return (
    <div className={className}>
      <label>{label}</label>
      <select {...input}>
        {items.map(({ label, value }) => {
          return (
            <option value={value} key={value}>
              {label}
            </option>
          );
        })}
      </select>
      {renderError(meta)}
    </div>
  );
};

export const HookStars = ({
  control,
  name,
  label,
  items,
  errors,
  ...props
}) => {
  console.log("HookSelect");
  console.log(props);
  const {
    field: { ref, onChange, ...inputProps },
    meta: { isTouched },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: props.defaultValue,
  });

  const className = `field ${errors[name] && isTouched ? "error" : ""}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <Rating
        onRate={(e, { rating }) => {
          //console.log(input);
          //console.log(data);
          onChange(rating);
        }}
        rating={inputProps.value}
        maxRating={5}
      />

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <div className="ui error message">
            <span>{message}</span>
          </div>
        )}
      />
    </div>
  );
};

export const renderStars = (field) => {
  const { input } = field;
  //const errorMessage = touched ? error : "";
  return (
    <>
      <Rating
        onRate={(e, { rating }) => {
          //console.log(input);
          //console.log(data);
          input.onChange(rating);
        }}
        rating={input.value}
        maxRating={5}
      />
    </>
  );
};

export function semanticFormField({
  input,
  type,
  label,
  placeholder,
  meta: { touched, error, warning },
  as: As = Input,
  ...props
}) {
  function handleChange(e, { value }) {
    return input.onChange(value);
  }
  return (
    <Form.Field>
      <As
        {...props}
        {...input}
        value={input.value}
        type={type}
        label={label}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {touched &&
        ((error && (
          <span>
            <i>{error}</i>
          </span>
        )) ||
          (warning && (
            <span>
              <i>{warning}</i>
            </span>
          )))}
    </Form.Field>
  );
}

/* export const CheckBox = ({ control, name, ...props }) => {
  //console.log(inputProps.errors[inputProps.name]);

  console.log(props);
  const {
    field: { ref, ...inputProps },
    meta: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: props.defaultValue,
  });
  console.log(`Value: ${props.value}`);
  return (
    <div>
      <Form.Field>
        <Form.Checkbox
          {...props}
          label={props.label}
          checked={props.value}
          //              onPress={props.onChange(!inputProps.value)}
          onChange={inputProps.onChange}
          inputRef={ref}
        />
      </Form.Field>
    </div>
  );
};

*/

export const CheckBox = ({ control, name, label, ...props }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
    //    defaultValue: props.defaultValue,
  });
  console.log(inputProps);
  return (
    <Form.Checkbox
      label={label}
      //defaultChecked={props.defaultValue}
      onChange={(e, d) => {
        inputProps.onChange(d.checked);
      }}
      checked={inputProps.value}
    />
  );
};
