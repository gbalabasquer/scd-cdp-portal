// Libraries
import React from "react";
import {observer, Provider} from "mobx-react";
import {BrowserRouter} from "react-router-dom";

// Components
import Modal from "./Modal";
import Notify from "./Notify";
import NotifySetUp from "./NotifySetUp";
import PriceModal from "./PriceModal";
import Routes from "./Routes";

// Stores
import DialogStore from "../stores/Dialog";
import NetworkStore from "../stores/Network";
import ProfileStore from "../stores/Profile";
import SystemStore from "../stores/System";
import TransactionsStore from "../stores/Transactions";
import ContentStore from "../stores/Content";

// Utils
import * as Blockchain from "../utils/blockchain-handler";

import "./App.css";

// Convenient console access
window.blockchain = Blockchain;
window.dialog = DialogStore;
window.network = NetworkStore;
window.profile = ProfileStore;
window.system = SystemStore;
window.transactions = TransactionsStore;
window.content = ContentStore;

class App extends React.Component {
  componentDidUpdate = prevProps => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Provider network={NetworkStore} profile={ProfileStore} transactions={TransactionsStore} system={SystemStore} dialog={DialogStore} content={ContentStore}>
        <BrowserRouter>
          <React.Fragment>
            <Routes />
            <Notify ref="notificator" />
            <NotifySetUp />
            <Modal show={ TransactionsStore.priceModal.open } close={ TransactionsStore.closePriceModal }>
              <PriceModal />
            </Modal>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default observer(App);
