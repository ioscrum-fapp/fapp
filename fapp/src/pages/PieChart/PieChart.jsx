import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { EXPENSES_COLLECTION } from '../../backend/expenseLogic';
import { TAGS_COLLECTION } from "../../backend/tagLogic";
import useCollection from "../../hooks/useCollection";

export default function PieChart() {
    const [tags] = useCollection(TAGS_COLLECTION);
    const [expenses] = useCollection(EXPENSES_COLLECTION);
    const [data2,setData2] = useState(null);
    
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)
    const labels = [];
    const TagNames = []
    const backgroundColor = [];
    useEffect(()=>{
        for (let i = 0; i < tags?.size; i+=1) {
            labels.push(tags.docs[i].data().description);
            TagNames.push(tags?.docs[i].id)
            backgroundColor.push(tags.docs[i].data().tagColor);
        }
       
        const data=tags?.docs.map(
            (tag) => 
                expenses?.docs.filter((expense)=>
                    expense.data().tags.includes(tag.id) && !expense.data().isIncome
                ).reduce((acc,current)=>
                acc+Number(current.data().value) ,0
                )
            
        )
        
        const data3 = {
            labels,
            datasets: [
              {
                data,
                backgroundColor,
              },
            ],
          };
        setData2(data3)
        
    },[tags,expenses])

    return (
        <div>
          {data2 ? (
            <div style={
                {
                    padding: '20px',
                    width: '50%'
                }
            }>
                <h2>Pie Chart</h2>
                <Pie data={data2} />
          </div>
          ) : (
            <p>Loading data...</p>
          )} 
        </div>
      );
}
