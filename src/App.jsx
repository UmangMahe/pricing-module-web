import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  TimePicker,
  Typography
} from "antd";
import { useAxiosCallback } from "./utils/useFetch";
import { CALCULATE_PRICE } from "./constants/ApiConstants";

const {Text} = Typography
const weekDays = [
  {
    value: 1,
    label: "Monday",
  },
  {
    value: 2,
    label: "Tuesday",
  },
  {
    value: 3,
    label: "Wednesday",
  },
  {
    value: 4,
    label: "Thursday",
  },
  {
    value: 5,
    label: "Friday",
  },
  {
    value: 6,
    label: "Saturday",
  },
  {
    value: 7,
    label: "Sunday",
  },
];

function App() {
  const [form] = Form.useForm()

  const {isLoading, callback: calculatePricing} = useAxiosCallback();

  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)

  const calculatePrice = (values)=>{
    console.log(values)

    const {time, ...rest} = values;

    rest['startTime'] = time[0]
    rest['endTime'] = time[1]

    calculatePricing({
      method: 'POST',
      url: CALCULATE_PRICE,
      data: {
        ...rest
      },
      success: (res)=>{
        setData(res)
        setOpen(true)
      }
    })
  }

  const [priceBreakVisible, setPriceBreakVisible] = useState(false)

  const handlePriceBreak = ()=>{
    setPriceBreakVisible(true)
  }

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <h1>Pricing Module v2</h1>
      <Divider />
      <Form form={form} onFinish={calculatePrice} size="large">
        <Row align={"middle"} justify={"center"} gutter={[16, 16]}>
          <Col xs={24} md={4}>
            <Form.Item name="weekDay" rules={[{ required: true }]}>
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                placeholder="Choose Weekday"
                options={weekDays}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={5}>
            <Form.Item name="time" rules={[{ required: true }]}>
              <TimePicker.RangePicker use12Hours format="hh:mm A" />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item name="distance" rules={[{ required: true }]}>
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                addonAfter="kms"
                placeholder="Distance travelled (in kms)"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item name="waitingTime" rules={[{ required: true }]}>
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                addonAfter="min(s)"
                placeholder="Waiting time (in min)"
              />
            </Form.Item>
          </Col>
        </Row>
        <br />

        <Form.Item >
          <Button type="primary" htmlType="submit" style={{ width: "200px" }}>Calculate Price</Button>
        </Form.Item>
      </Form>

      <Modal
          title=""
          open={open}
          destroyOnClose
          onOk={() => {setPriceBreakVisible(false); setOpen(false)}}
          onCancel={() =>  {setPriceBreakVisible(false); setOpen(false)}}
          centered
          cancelButtonProps={{
            style: { display: "none" },
          }}
          // width={600}
        >
          <Row style={{height: '100%'}} justify={'center'} align={'middle'}>
            <Col span={24}>
              <h3 style={{textAlign: 'center', marginBottom: 0}}>Please pay to the driver</h3>
            </Col>
            <Col span={24}>
              <h1 style={{textAlign: 'center', fontSize: '4em', marginBottom: '30px'}}>₹{data?.amount}</h1>
            </Col>
            <Col span={24}>
              <Text type="warning" onClick={handlePriceBreak} style={{textAlign: 'center', cursor: 'pointer'}}>Price breakage</Text>
            </Col>
            
            {priceBreakVisible?(
              <>
              <Col style={{marginTop: '10px'}} span={24}>
                <Text type="secondary">Base Charge - ₹{data.data.baseCharge}</Text>
              </Col>
              <Col span={24}>
              <Text type="secondary">Additional Distance Charge ({data.data.additionalDistanceCharge.distance}) - ₹{data.data.additionalDistanceCharge.price}</Text>
            </Col>
            <Col span={24}>
              <Text type="secondary">Time Surge ({data.data.timeSurge.time}) - {data.data.timeSurge.charge}</Text>
            </Col>
            <Col span={24}>
              <Text type="secondary">Waiting Charge - ₹{data.data.waitingCharge}</Text>
            </Col>
            <Divider dashed />
            <Col span={24}>
              <Text strong>Total (in Roundoff) - ₹{data.amount}</Text>
            </Col>
            </>
            ):null}
          </Row>
        </Modal>
    </>
  );
}

export default App;
