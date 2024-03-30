export default function staticImplments<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
