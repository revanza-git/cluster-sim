import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                [1, 1, 0],
                [1, 0, 1],
                [1, 0, 1]
            ]
        };
    }
    componentDidMount() {}

    handleClick() {
        const roundedRandom = Math.round(Math.random() * 10) + 1;
        const randomArray = this.generateGround(roundedRandom, roundedRandom);
        this.setState({ data: randomArray });
    }

    generateGround(height, width) {
        var ground = [];
        for (var y = 0; y < height; y++) {
            ground[y] = [];
            for (var x = 0; x < width; x++) {
                ground[y][x] = tile();
            }
        }
        return ground;

        function tile() {
            return Math.round(Math.random());
        }
    }

    //Depth-First Search
    check(array) {
        function test(array, i, j, value) {
            if (array[i] && array[i][j] === -1) {
                array[i][j] = value;
                test(array, i - 1, j, value);
                test(array, i + 1, j, value);
                test(array, i, j - 1, value);
                test(array, i, j + 1, value);
                return true;
            }
        }
        var value = 1;

        array.forEach(a => a.forEach((b, i, bb) => (bb[i] = -b)));
        array.forEach((a, i, aa) =>
            a.forEach((b, j) => test(aa, i, j, value) && value++)
        );

        return value - 1;
    }

    conv(param) {
        if (param === 1) {
            return "S";
        }
        return "P";
    }

    render() {
        const state = this.state.data;

        return (
            <div className="container">
                <div className="card">
                    <table className="table-grid">
                        <thead></thead>
                        <tbody>
                            {state.map((c, i) => (
                                <tr key={i}>
                                    {state[i].map((x, y) => (
                                        <th key={y} className={this.conv(x)}>
                                            {this.conv(x)}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <span>Total Cluster(s): {this.check(this.state.data)}</span>
                </div>
                <div className="misc">
                    <button onClick={e => this.handleClick(e)}>Ubah</button>
                    <p>Click Button Untuk Mengubah Jumlah Grid</p>
                </div>
            </div>
        );
    }
}

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
