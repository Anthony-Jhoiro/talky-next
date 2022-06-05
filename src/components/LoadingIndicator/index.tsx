// Code from : https://loading.io/css

export const LoadingIndicator = () => {
  return (
    <div className={"lds-ellipsis"}>
      {Array.from(Array(4).keys()).map((i) => (
        <div key={i} />
      ))}
    </div>
  );
};
