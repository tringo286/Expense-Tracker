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

    const data = {
        labels: incomes.map(income => {
            const date = new Date(income.incomeDate);
            return date.toLocaleDateString('en-US');  // mm/dd/yyyy
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map(income => {
                        return income.incomeAmount;
                    })
                ],
                backgroundColor: 'green',
                tension: .2,
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map(expense => {
                        return expense.expenseAmount;
                    })
                ],
                backgroundColor: 'red',
                tension: .2,
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