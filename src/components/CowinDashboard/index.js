// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

const statusList = {
  success: 'Success',
  failure: 'failure',
  inPrgoress: 'inProgress',
}

class CowinDashboard extends Component {
  state = {
    dataList: {
      last7DaysVaccination: '',
      vaccinationByAge: '',
      vaccinationByGender: '',
    },
    status: statusList.inPrgoress,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({dataList: updatedData, status: statusList.success})
    } else {
      this.setState({status: statusList.failure})
    }
  }

  renderSuccess = () => {
    const {dataList} = this.state

    const {last7DaysVaccination, vaccinationByAge, vaccinationByGender} =
      dataList

    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
        />
        <h1>co-WIN</h1>
        <h1>CoWIN Vaccination in India</h1>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => {
    ;<div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  }

  render() {
    const {status} = this.state
    switch (status) {
      case statusList.inPrgoress:
        return this.renderLoader()
      case statusList.success:
        return this.renderSuccess()
      case statusList.failure:
        return this.renderFailure()
      default:
      return null
    }
  }
}
export default CowinDashboard
