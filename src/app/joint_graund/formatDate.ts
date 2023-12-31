function formatDateString(inputDateString: string) {
    const date = new Date(inputDateString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  export default formatDateString;