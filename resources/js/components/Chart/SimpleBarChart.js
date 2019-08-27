import * as React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class SimpleBarChart extends React.PureComponent {
	render() {
		const {newData,label,llaves,ancho,alto} = this.props;
        return (
            <BarChart
                width={ancho===undefined?800:ancho}
                height={alto === undefined ? 300 : alto}
                data={newData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="2 2" />
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(169,3,41,1)" stopOpacity={1} />
                        <stop offset="44%" stopColor="rgba(143,2,34,1) " stopOpacity={1} />
                        <stop offset="100%" stopColor="rgba(109,0,25,1)" stopOpacity={1} />
                        
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgba(164,179,87,1)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="rgba(117,137,12,1)" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <XAxis dataKey={label} />
                <YAxis yAxisId="left"/>
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                
                {<Bar yAxisId="right" dataKey={llaves} fill={'url(#colorPv)'} />}
            </BarChart>
        );
	}
}
