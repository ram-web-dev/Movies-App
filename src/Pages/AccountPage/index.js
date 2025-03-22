import Header from '../../components/Header'
import Footer from '../../components/Footer'

import './index.css'

const AccountPage = () => (
  <div className="account-page-container">
    <Header />
    <div className="account-section-container">
      <div className="account-section">
        <h1 className="account-heading">Account</h1>
        <hr />
        <div className="account-info">
          <p className="account-info-heading">Membership</p>
          <div>
            <p className="account-mail">rahul@gmail.com</p>
            <p className="account-password">Password : ************</p>
          </div>
        </div>
        <hr />
        <div className="account-info">
          <p className="account-info-heading">Plan details</p>
          <p className="account-subscription">
            Premium <span className="subscription-badge">Ultra HD</span>
          </p>
        </div>
        <hr />
        <div className="logout-btn-container">
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default AccountPage
