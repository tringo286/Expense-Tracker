import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import useDataProvider from '../hooks/useDataProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
    const { incomes, expenses } = useDataProvider();

    const allDates = [
        ...incomes.map(income => new Date(income.incomeDate).toLocaleDateString('en-US')),
        ...expenses.map(expense => new Date(expense.expenseDate).toLocaleDateString('en-US'))
    ];
    
    const uniqueDates = [...new Set(allDates)].sort((a, b) => new Date(a) - new Date(b));

    const incomeData = uniqueDates.map(date => {
        const income = incomes.find(income => new Date(income.incomeDate).toLocaleDateString('en-US') === date);
        return income ? income.incomeAmount : 0;
    });

    const expenseData = uniqueDates.map(date => {
        const expense = expenses.find(expense => new Date(expense.expenseDate).toLocaleDateString('en-US') === date);
        return expense ? expense.expenseAmount : 0;
    });

    const data = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: '#84cc16',  
                borderColor: '#84cc16',      
                pointBackgroundColor: '#65a30d',  
                pointBorderColor: '#65a30d',      
                tension: 0.2,
                cubicInterpolationMode: 'monotone',
                pointRadius: (context) => {                    
                    return context.raw !== 0 ? 3 : 0;  
                },
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: '#ef4444',  
                borderColor: '#ef4444',      
                pointBackgroundColor: '#dc2626',  
                pointBorderColor: '#dc2626',      
                tension: 0.2,
                cubicInterpolationMode: 'monotone',
                pointRadius: (context) => {                    
                    return context.raw !== 0 ? 3 : 0;  
                },
            }
            
        ]   
    };

    return (
        <div>
            <Line data={data} />
        </div>
    )
}

export default Chart;