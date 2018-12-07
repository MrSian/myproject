import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Lazy extends Component {
    constructor (props) {
        super(props)
        this.state = {
            mod: null
        }
    }

    componentWillMount () {
        this.load(this.props)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load (props) {
        this.setState({
            mod: null
        })
        props.load((mod) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            })
        })
    }

    render () {
        return this.state.mod ? this.props.children(this.state.mod) : null
    }
}

Bundle.propTypes = {
    load: PropTypes.any,
    children: PropTypes.any
}

export default function lazy (lazyClass) {
    return function Wrapper (props) {
        return <Bundle load={lazyClass}>
            {(Clazz) => <Clazz {...props} />}
        </Bundle>
    }
}