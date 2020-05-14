import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ImageGallery from '../imageGallery'

export default class Category extends Component {

    static propTypes = {
        breadCrumbs: PropTypes.array,
        categories: PropTypes.array
    }

    constructor(props) {
        super(props)

        this.state = {
            categories: props.categories,
            pathPrefix: 'category',
            breadCrumbs: props.breadCrumbs
        }

        this.handleSubCategories = this.handleSubCategories.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ categories: nextProps.categories, pathPrefix: 'category' })
    }

    handleSubCategories(category) {
        const { breadCrumbs } = this.state
        breadCrumbs.push(category.name)
        this.setState({ breadCrumbs, categories: category.subcategories, pathPrefix: 'category/subcategory' })
    }

    render() {
        const { categories, pathPrefix, breadCrumbs } = this.state

        return (
            categories ? <ImageGallery
                breadCrumbs={breadCrumbs}
                categories={categories}
                onCategoryClick={this.handleSubCategories}
                pathPrefix={pathPrefix}
            /> :
                <h2>No sub level found</h2>
        )
    }
}
