import { Button } from "antd";
import { useWorker } from "@hooks";
const Worker = () => {
  const { runWorker, result } = useWorker();
  const calculate = () => {
    runWorker(10000000000);
  };
  const test = () => {
    console.log("test");
  };
  //   AbortController
  return (
    <div>
      <h1>Worker</h1>
      <Button type="primary" onClick={calculate}>
        calculate
      </Button>
      <Button type="primary" onClick={test}>
        run test
      </Button>
      <h1>Result: {result}</h1>
    </div>
  );
};

export default Worker;
