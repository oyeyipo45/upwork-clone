import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostScreen from "./screens/PostScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProposalScreen from "./screens/ProposalScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import EditPostScreen from "./screens/EditPostScreen";
import BidDetailsScreen from "./screens/BidDetailsScreen";
import PlacedBidsScreen from "./screens/PlacedBidsScreen";
import BidsListHirerScreen from "./screens/BidListHirerScreen";
import BidDetailsHirerScreen from "./screens/BidDetailsHirerScreen";
import NotFound from "./screens/NotFound";

const App = () => {
  return (
    <Router>
      <div className="main-body">
        <Header />
        <main className="main-section">
          <Switch>
            <Route path="/placedBids/:id" component={PlacedBidsScreen} />
            <Route path="/bidsHirer/:id" component={BidDetailsHirerScreen} />
            <Route path="/bids/:id" component={BidDetailsScreen} />
            <Route path="/edit/:id" component={EditPostScreen} />
            <Route path="/createPost" component={CreatePostScreen} />
            <Route path="/bidListHirer/:id" component={BidsListHirerScreen} />
            <Route path="/profile/:id" component={ProfileScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/post/:id" component={PostScreen} />
            <Route path="/proposal/:id" component={ProposalScreen} />
            <Route path="/" exact component={HomeScreen} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
