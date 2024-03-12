import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import {Component} from 'react'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props
  let data = []
  console.log(last7DaysVaccination)
  if (last7DaysVaccination !== '') {
    const updateddata = last7DaysVaccination.map(each => ({
      vaccineDate: each.vaccine_date,
      dose1: each.dose_1,
      dose2: each.dose_2,
    }))
    data = updateddata
  }

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div>
      <h1>Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={data}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="Dose1" fill="#1f77b4" barSize="20%" />
          <Bar dataKey="dose2" name="Dose2" fill="#fd7f0e" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
