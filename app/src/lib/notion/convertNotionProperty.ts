const convertNotionProperty = (property: any, type: string) => {
  switch (type) {
    case "title":
      return property.title[0]["plain_text"];
    case "rich_text":
      return property["rich_text"][0]
        ? property["rich_text"][0]["plain_text"]
        : "";
    case "number":
      return property.number;
    case "url":
      return property.url;
    case "date":
      return property.date.start;
    case "select":
      return property.select.name;
    case "formula":
      return property.formula.number;

    default:
      return "";
  }
};

export default convertNotionProperty;
