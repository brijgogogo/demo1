import React, { Component } from "react";
import "./index.css";

export default class StockData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      result: { data: [] },
      firstSearch: false,
    };
  }

  updateSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  fetchData = () => {
    fetch(
      "https://jsonmock.hackerrank.com/api/stocks?date=" + this.state.search
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          firstSearch: true,
          result: data,
        });
      });
  };

  render() {
    const data = this.state.result.data;
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input
            type="text"
            className="large"
            placeholder="5-January-2000"
            id="app-input"
            data-testid="app-input"
            autoFocus
            name="search"
            onChange={this.updateSearch}
            value={this.state.search}
          />
          <button
            className=""
            id="submit-button"
            data-testid="submit-button"
            onClick={this.fetchData}
          >
            Search
          </button>
        </section>
        {data.length ? (
          <ul
            className="mt-50 slide-up-fade-in styled"
            id="stockData"
            data-testid="stock-data"
          >
            <li className="py-10">Open : {data[0].open}</li>
            <li className="py-10">High: {data[0].high}</li>
            <li className="py-10"> Low: {data[0].low}</li>
            <li className="py-10">Close : {data[0].close}</li>
          </ul>
        ) : this.state.firstSearch ? (
          <div
            className="mt-50 slide-up-fade-in"
            id="no-result"
            data-testid="no-result"
          >
            No Results Found
          </div>
        ) : null}
      </div>
    );
  }
}