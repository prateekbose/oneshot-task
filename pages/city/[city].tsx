import { College } from "../../interfaces/interfaces";

export async function getServerSideProps(context: any) {
  console.log(context.query);
  const data = await fetch(process.env.API, {
    method: "POST",
    body: {
      type: "city",
      data: context.query.city,
    },
  });
  const res = await data.json();

  return {
    props: {
      data: res,
    },
  };
}

export default function CollegePage({ data }: { data: College }) {
  console.log(data);
  return <div></div>;
}
