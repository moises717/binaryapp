import { useState } from "react";
import "./App.css";
import { Button, InputNumber, Tag, Typography, Card, Divider, Space, Form } from "antd";
import NumberFormat from "react-number-format";

function App() {
	const [number, setNumber] = useState("2021");
	const [results, setResults] = useState([]);
	const [suma, setSuma] = useState([]);
	const [base, setBase] = useState(10);

	const calcular = (num = "") => {
		const sumaResult = [];
		const numArray = num.split("").reverse();
		const res = numArray.map((recordNum, i) => {
			const numPotenciado = Math.pow(base, i);
			const finalResult = recordNum * numPotenciado;
			sumaResult.push(finalResult);
			return {
				finalResult,
				numPotenciado,
				recordNum,
				potencia: i
			};
		});

		setResults(res.reverse());

		setSuma(sumaResult);
	};

	return (
		<>
			<div className="container">
				<Card title="Descomponer decimales  y binarios" bordered={false}>
					<Space>
						<Form.Item label="Base">
							<InputNumber value={base} onChange={(e) => setBase(e)} />
						</Form.Item>
						<Form.Item label="Decimal">
							<InputNumber value={number} onChange={(e) => setNumber(e ? e.toString() : "")} />
						</Form.Item>
					</Space>
					<Divider />
					<Button type="primary" onClick={() => calcular(number)}>
						Comprobar
					</Button>
				</Card>
			</div>

			<div className="footer">
				<Typography.Title level={4}>Resultado: </Typography.Title>
				{results.map((recordNum, i) => {
					return (
						<div key={i}>
							{recordNum.recordNum}{" "}
							<span className="lista">
								x {base} <span className="potencia">{recordNum.potencia}</span>={" "}
								<Tag color="blue">{recordNum.finalResult}</Tag>
							</span>
						</div>
					);
				})}
				{results.length > 0 && (
					<div>
						<Divider />
						Total resultado{": "}
						<b>
							<NumberFormat
								thousandSeparator={true}
								value={suma.reduce((a, b) => a + b, 0)}
								style={{ border: "none" }}
							/>
						</b>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
