import "./App.css";
import axios from "axios";
import Calendar from "react-calendar";
import React, { useState, useEffect } from "react";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink, Route, Routes, useParams } from "react-router-dom";
import { ChromePicker } from "react-color";
import Accordion from "react-bootstrap/Accordion";
import ProgressBar from "@ramonak/react-progress-bar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function Habitlist(data) {
  console.log(data);
  console.log(data.data);
  let d = data.data;
  const hlist = [];
  for (let k in d) {
    console.log(k);
    hlist.push(
      <Accordion
        style={{ display: "inline-block", width: "350px" }}
        defaultActiveKey={["0"]}
        alwaysOpen
      >
        <p></p>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{k}</Accordion.Header>
          <Accordion.Body>
            <h5>목표: {d[k][0]}</h5>
            <h5>성취: {d[k][5]}</h5>
            <h5>달성률: {(d[k][5] / d[k][0]) * 100}%</h5>
            <ProgressBar
              completed={(d[k][5] / d[k][0]) * 100}
              bgColor={d[k][4]}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
  return (
    <div>
      <p></p>
      <h1 style={{ paddingLeft: "10px" }}>습관목록</h1>
      <p></p>
      <div style={{ height: "5%" }}></div>
      {hlist}
    </div>
  );
}

function HabitDetails(data) {
  console.log("=====");
  console.log(data.data);
  let params = useParams().id;
  console.log(params);
  console.log(data.data[params]);
  let nowhabit = data.data[params];
  let empty = [];

  for (let i = 0; i < nowhabit[5]; i++) {
    empty.push(
      <div
        key={i}
        className="detailtdot"
        style={{ backgroundColor: nowhabit[4] }}
      ></div>
    );
  }
  for (let i = 0; i < nowhabit[0] - nowhabit[5]; i++) {
    empty.push(
      <div
        key={i}
        className="detailtdot"
        style={{ backgroundColor: "black" }}
      ></div>
    );
  }
  return (
    <div>
      <h1>{params}</h1>
      <h3> {nowhabit[2]}</h3>
      <p></p>
      <div>{empty}</div>
    </div>
  );
}

function Modal_form(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [goal, setGoal] = useState(<p></p>);
  const [cycle, setCycle] = useState(<p></p>);
  const [startDate, setStartDate] = useState(new Date());
  const [habitname, setHabitname] = useState("");
  const [details, setDetails] = useState("");
  const [color, setColor] = useState("");

  return (
    <>
      <NavLink to="/habitlist">
        <Button variant="primary">=</Button>
      </NavLink>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>새로운 습관</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>습관 이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="습관 이름을 입력해주세요."
                onChange={(e) => {
                  setHabitname(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>

            <DropdownButton
              title="목표 성취 횟수"
              id="bg-nested-dropdown"
              onSelect={(eventKey) => {
                console.log(eventKey);
                setGoal(eventKey);
              }}
            >
              <Dropdown.Item eventKey="10">10일</Dropdown.Item>
              <Dropdown.Item eventKey="20">20일</Dropdown.Item>
              <Dropdown.Item eventKey="30">30일</Dropdown.Item>
            </DropdownButton>
            {goal}

            <DropdownButton
              title="주기"
              id="bg-nested-dropdown"
              onSelect={(eventKey) => {
                console.log(eventKey);
                setCycle(eventKey);
              }}
            >
              <Dropdown.Item eventKey="1">1일</Dropdown.Item>
              <Dropdown.Item eventKey="2">2일</Dropdown.Item>
              <Dropdown.Item eventKey="3">3일</Dropdown.Item>
              <Dropdown.Item eventKey="4">4일</Dropdown.Item>
              <Dropdown.Item eventKey="5">5일</Dropdown.Item>
              <Dropdown.Item eventKey="6">6일</Dropdown.Item>
              <Dropdown.Item eventKey="7">7일</Dropdown.Item>
            </DropdownButton>
            {cycle}
            <p></p>
            <span>시작일</span>
            <DatePicker
              dateFormat={moment(startDate).format("YYYY-MM-DD")}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
            />
            <p></p>
            <input
              placeholder="아래 색을 클릭하세요"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <ChromePicker
              color={color}
              onChange={(color) => setColor(color.hex)}
            />
            <p></p>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>세부내용</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="습관의 세부내용을 기록해주세요."
                rows={3}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              console.log(habitname);
              props.habitmaker(
                goal,
                cycle,
                habitname,
                details,
                startDate,
                color
              );
            }}
          >
            습관생성
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function App() {
  const [value, setValue] = useState(new Date());
  let mark = [];
  const [marks, setMarks] = useState({ 습관: [mark, "#000"] });
  const [showFooter, setShowFooter] = useState(true);
  const [boxchecked, setBoxchecked] = useState([]);
  const [context, setContext] = useState();

  useEffect(() => {
    habitdate();
  }, []);

  function change_achieve(urls, habitname, nowdate) {
    const newachieve = {
      name: habitname,
      date: nowdate,
    };

    axios
      .post("http://localhost:8000" + urls, JSON.stringify(newachieve), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res);
        habitdate();
      });
  }

  let footer = "";
  if (showFooter) {
    let tmp = [];
    let dayvalue;
    for (let key in marks) {
      dayvalue = moment(value).format("YYYY-MM-DD");
      if (marks[key][0].includes(dayvalue)) {
        tmp.push(key);
      }
    }

    //어떤기준으로 체크박스가 남아있는지
    const checkboxList = tmp.map((check) => (
      <ListGroup.Item>
        <div className="detailhabit" key={dayvalue + check}>
          <input
            id={dayvalue + " " + check}
            type="checkbox"
            defaultChecked={
              boxchecked.includes(dayvalue + " " + check) ? true : false
            }
            onClick={(e) => {
              console.log(e.target.id);
              if (!boxchecked.includes(e.target.id)) {
                let newchecked = [...boxchecked];
                newchecked.push(e.target.id);
                setBoxchecked(newchecked);
                console.log(newchecked);
                change_achieve("/achievedate", check, dayvalue);
              } else {
                let newchecked = [...boxchecked];
                for (let i = 0; i < newchecked.length; i++) {
                  if (newchecked[i] === e.target.id) {
                    newchecked.splice(i, 1);
                    i--;
                    break;
                  }
                }
                setBoxchecked(newchecked);
                change_achieve("/deleteachieve", check, dayvalue);
              }
            }}
          ></input>
          <NavLink to={"/" + check} style={{ textDecoration: "none" }}>
            {" "}
            {check}
          </NavLink>
        </div>
      </ListGroup.Item>
    ));
    footer = (
      <Card
        class="d-flex justify-content-end"
        style={{
          float: "none",
          margin: 0,
          display: "inline-block",
          width: "350px",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Card.Header>{moment(value).format("YYYY년 MM월 DD일")}</Card.Header>
        <ListGroup variant="flush">{checkboxList}</ListGroup>
      </Card>

      // <div>
      //   <p></p>
      //   <h3>{moment(value).format("YYYY년 MM월 DD일")}</h3>
      //   {checkboxList}
      // </div>
    );
  }

  async function habitdate() {
    let response = await axios.get("http://localhost:8000/readhabit");
    let tmp = JSON.stringify(response.data);
    console.log(tmp);
    let obj = JSON.parse(tmp);
    let response2 = await axios.get("http://localhost:8000/counthabit");
    let tmp2 = JSON.stringify(response2.data);
    let obj2 = JSON.parse(tmp2);

    console.log(obj2);
    let objdata = {};

    let dateList = {};
    for (let key in obj) {
      let temp = [];
      let t = [];
      t = obj[key].slice(1, 6);
      t.push(obj2[obj[key][0]]);
      objdata[obj[key][0]] = t;

      let year = obj[key][4].slice(0, 4);
      let month = obj[key][4].slice(5, 7);
      let date = obj[key][4].slice(8, 10);
      let ndate = new Date(Number(year), Number(month - 1), Number(date));
      for (let i = 0; i < obj[key][1]; i++) {
        temp.push(moment(ndate).format("YYYY-MM-DD"));
        ndate.setDate(ndate.getDate() + Number(obj[key][2]));
      }
      dateList[obj[key][0]] = [temp, obj[key][5]];
    }
    console.log(dateList);
    let newmarks = { ...marks };
    newmarks = dateList;
    setMarks(newmarks);

    console.log("dd", objdata);
    let newcontext = { ...context };
    newcontext = objdata;
    setContext(newcontext);
  }

  function habitmaker(goal, cycle, habitname, details, start, color) {
    console.log(goal, cycle, habitname, details, start, color);
    const newhabit = {
      name: habitname,
      goal: goal,
      cycle: cycle,
      details: details,
      start: moment(start).format("YYYY-MM-DD"),
      color: color,
    };

    axios
      .post("http://localhost:8000/newhabit", JSON.stringify(newhabit), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res);
        habitdate();
      });
  }

  const findDayHabbit = ({ date }) => {
    let tileResult = [];
    for (let key in marks) {
      if (marks[key][0].find((x) => x === moment(date).format("YYYY-MM-DD"))) {
        tileResult.push(
          <div>
            {/* map함수로inline되도록하기 */}
            <div className="dot" style={{ backgroundColor: marks[key][1] }}>
              {/* {key} */}
            </div>
          </div>
        );
      }
    }
    return tileResult;
  };

  return (
    <div className="calendar">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Modal_form habitmaker={habitmaker} />
              <Calendar
                value={value}
                onChange={(x) => {
                  setValue(x);
                  setShowFooter(true);
                }}
                //날짜 형식지정
                formatDay={(locale, date) => {
                  return moment(date).format("DD");
                }}
                next2Label={null}
                prev2Label={null}
                showNeighboringMonth={false}
                navigationLabel={null}
                minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                className="mx-auto w-full text-sm border-b"
                //날짜 밑의 타일 스타일

                //날짜를 다 훑고나서 습관을 훑음.. map으로 뿌릴수가없음.......
                tileContent={findDayHabbit}
              />
              <p></p>
              <div className="content">{footer}</div>
            </div>
          }
        ></Route>
        <Route path="/habitlist" element={<Habitlist data={context} />}></Route>
        <Route path="/:id" element={<HabitDetails data={context} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
