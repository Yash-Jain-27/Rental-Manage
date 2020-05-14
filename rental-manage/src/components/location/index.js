import React, { Component } from 'react'
import catalog from '../../lib/catalog.json'
import '../../App.css'
import Category from '../category'

export default class App extends Component {

    constructor() {
        super()

        this.state = {
            selectedLocation: '',
            showLocation: false,
            showCategoryPage: false,
            breadCrumbs: []
        }

        this.showLocation = this.showLocation.bind(this)
    }

    handleBranches(branch, e) {
        this.state.breadCrumbs.push(branch.name)

        this.setState({
            selectedBranch: branch.categories ? branch.categories : [],
            showCategoryPage: true,
            showLocation: false,
            selectedLocation: '',
        })

        e.stopPropagation()
    }

    renderBranches(branches) {
        return <ul>
            {
                branches.map((branch) => {
                    return <li key={branch.branch_id} onClick={this.handleBranches.bind(this, branch)}>
                        <a href="#section">{branch.name}</a>
                    </li>
                })
            }
        </ul>
    }

    handleLocation(location) {
        const { showLocation, selectedLocation, breadCrumbs } = this.state
        breadCrumbs.splice(0, breadCrumbs.length)

        breadCrumbs.push(location.name)

        this.setState({
            selectedLocation: showLocation && location.branches && location.branch_id !== selectedLocation
                ? location.dealers_id : ''
        })
    }

    renderLocations(locations) {
        return <div>
            <a className="selectLocation" href="#select" key={1} onClick={this.showLocation}>Select Location</a>
            {this.state.showLocation && <ul className="locationUl" key={2}>
                {
                    locations.map((location) => {
                        return <li key={location.dealers_id} onClick={this.handleLocation.bind(this, location)}>
                            <a href="#section">{location.name}</a>
                            {this.state.selectedLocation === location.dealers_id && this.renderBranches(location.branches)}
                        </li>
                    })
                }
            </ul>
            }
        </div>
    }

    showLocation() {
        const { showLocation } = this.state

        if (!showLocation) {
            this.setState({
                selectedBranch: [],
                breadCrumbs: [],
                showCategoryPage: false
            })
        }

        this.setState({
            showLocation: !showLocation
        })

    }

    render() {
        const { showCategoryPage, selectedBranch, breadCrumbs } = this.state

        return (
            <div className="App">
                <nav className="App-header">
                    <div className="logoCss">RENTAL MANAGEMENT SYSTEM</div>
                    {this.renderLocations(catalog.data.locations)}
                </nav>
                {showCategoryPage ?
                    <Category
                        breadCrumbs={breadCrumbs}
                        categories={selectedBranch}
                    />
                    :
                    <div className="welcome">
                        WELCOME TO RENTAL MANAGEMENT SYSTEM <br />
                          Please select Location
                    </div>
                }
                <footer className="App-footer"></footer>
            </div>
        )
    }

}
