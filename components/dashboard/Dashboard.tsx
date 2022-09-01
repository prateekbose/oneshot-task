import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { ArrowUpRight } from "react-feather";
import { College } from "../../interfaces/interfaces";
import { AppContext } from "../../pages";

const BarChart = dynamic(() => import("../BarChat/BarChart"), {
  ssr: false,
});

export default function Dashboard() {
  const [graphIndex, setGraphIndex] = useState(0);
  const [cities, setCities] = useState(new Map<string, number>());
  const [state, setStates] = useState(new Map<string, number>());
  const [courses, setCourses] = useState(new Map<string, number>());
  const [students, setStudents] = useState(0);
  const { data } = useContext(AppContext);

  useEffect(() => {
    let _cities = new Map<string, number>();
    let _state = new Map<string, number>();
    let _courses = new Map<string, number>();
    let _students = 0;

    data.forEach((college: College) => {
      let _temp = _cities.get(college.city) || 0;
      _cities.set(college.city, _temp + 1);
      _temp = _state.get(college.state) || 0;
      _state.set(college.state, _temp + 1);
      let _temp_courses = college.courses;
      _temp_courses.forEach((course: string) => {
        let _temp2 = _courses.get(course) || 0;
        _courses.set(course, _temp2 + 1);
      });
      _students += parseInt(college.no_of_students);
    });

    setCities(_cities);
    setStates(_state);
    setCourses(_courses);
    setStudents(_students);
  }, []);

  console.log(cities, state, courses, students);
  return (
    <div className="dashboard" style={{ position: "relative" }}>
      <div className="top">
        <div className="stat">
          <h3>Cities</h3>
          <div>
            <h1>{cities.size}</h1>
            <div className="details">
              <span>
                +100% <ArrowUpRight />
              </span>
              <span>+{cities.size} this week</span>
            </div>
          </div>
        </div>
        <div className="stat">
          <h3>States</h3>
          <div>
            <h1>{state.size}</h1>
            <div className="details">
              <span>
                +100% <ArrowUpRight />
              </span>
              <span>+{state.size} this week</span>
            </div>
          </div>
        </div>
        <div className="stat">
          <h3>Students</h3>
          <div>
            <h1>{students}</h1>
            <div className="details">
              <span>
                +100% <ArrowUpRight />
              </span>
              <span>+{students} this week</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="toggle">
          <h3
            className={graphIndex == 0 ? "active" : ""}
            onClick={() => setGraphIndex(0)}
          >
            City
          </h3>
          <h3
            className={graphIndex == 1 ? "active" : ""}
            onClick={() => setGraphIndex(1)}
          >
            State
          </h3>
          <h3
            className={graphIndex == 2 ? "active" : ""}
            onClick={() => setGraphIndex(2)}
          >
            Courses
          </h3>
        </div>
        <div className="graph" style={{ position: "absolute" }}>
          <BarChart
            data={graphIndex == 0 ? cities : graphIndex == 1 ? state : courses}
          />
        </div>
      </div>
    </div>
  );
}
