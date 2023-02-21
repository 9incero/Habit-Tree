import "./App.css";
import axios from "axios";
import Calendar from "react-calendar";
import React, { useState } from "react";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "bootstrap/dist/css/bootstrap.css";

function Modal_form() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [goal, setGoal] = useState("goal");
  const [cycle, setCycle] = useState("cycle");

  return (
    <>
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
                autoFocus
              />
            </Form.Group>

            <DropdownButton
              title="목표 성취 횟수"
              id="bg-nested-dropdown"
              onSelect={(eventKey) => {
                console.log(eventKey);
                setGoal(<h1>{eventKey}일</h1>);
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
                setCycle(<h1>{eventKey}일</h1>);
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
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>세부내용</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="습관의 세부내용을 기록해주세요."
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            습관생성
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function App() {
  const [value, setValue] = useState(new Date());
  let mark = ["2023-02-15", "2023-02-25"];
  let content;
  const [marks, setMarks] = useState(mark);

  const [showFooter, setShowFooter] = useState(false);

  function test(d) {
    alert(d);
    const data = {
      save_date: d,
    };
    axios
      .post("http://localhost:8000/save", JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }

  let footer = "아무 날짜도 없음";
  if (showFooter) {
    footer = (
      <>
        <h1>안녕하세요 하단 바 입니다.</h1>
        <div className="text-gray-500 mt-4">
          {moment(value).format("YYYY년 MM월 DD일")}
        </div>
        <button
          onClick={(e) => {
            test(moment(value).format("YYYY-MM-DD"));
          }}
        >
          날짜
        </button>
      </>
    );
  }

  async function request() {
    let response = await axios.get("http://localhost:8000/");
    let tmp = JSON.stringify(response.data);
    console.log(tmp);
    console.log(tmp.length);
    let obj = JSON.parse(tmp);
    console.log(obj);
    console.log(Object.values(obj));
    let newmarks = [...marks];
    newmarks = Object.values(obj);
    setMarks(newmarks);
    // for (var k in Object.keys(obj)) {
    //   console.log(Object.keys(obj));
    //   console.log(k);
    //   console.log(obj[k]);
    // }
  }

  return (
    <div>
      <button onClick={request}>새로고침</button>
      <Modal_form />
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
        tileContent={({ date, view }) => {
          if (marks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return <div className="dot" onClick={() => {}}></div>;
          }
        }}
      />

      {footer}
    </div>
  );
}

export default App;
