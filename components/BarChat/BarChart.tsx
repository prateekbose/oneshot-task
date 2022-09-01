import { ResponsiveBar } from "@nivo/bar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../pages";

export default function BarChart({ data }: { data: any }) {
  const { theme } = useContext(AppContext);
  const router = useRouter();
  const [_data, setData] = useState(data);
  useEffect(() => {
    let temp = Array.from(data).reduce((res: Array<any>, curr: any) => {
      res.push({
        field: curr[0],
        count: curr[1],
      });

      return res;
    }, []);

    setData(temp);
  }, [data]);

  const openCollege = (path: string) => {
    console.log(path);
    router.push("/", path, {
      shallow: false,
    });
  };

  return (
    <ResponsiveBar
      data={_data}
      keys={["count"]}
      indexBy="field"
      //   layout="horizontal"
      margin={{ top: 75, right: 0, bottom: 50, left: 0 }}
      padding={0.5}
      valueScale={{ type: "linear" }}
      colors="#2A6FFF"
      animate={false}
      enableLabel={true}
      axisTop={null}
      axisRight={null}
      axisLeft={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 0,
        tickRotation: 0,
        legend: "Count",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      labelTextColor={theme == "light" ? "#313131" : "#FFFFFF"}
      //   onClick={(node: any) => openCollege(`/city/${node.indexValue}`)}
    />
  );
}
