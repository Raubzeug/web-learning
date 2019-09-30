import React from 'react'

class Mark extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            mark: ''
        }
    }

    handleChange = ({target: {name, value}}) => this.setState({ [name]: value })

    submitForm = (event) => {
        event.preventDefault()
        console.log(this.state.mark)
        return false
        // fetch to server (now backend hasn't marks model)
        // this.props.submit({
        //     mark: this.state.mark
        // })
    }

    render = () => (
        <div className="mark">
            <form action='#'>
                <input className="mark__input" type="text" name="mark"
                    value={this.state.mark} onChange={this.handleChange} />
                <button className="mark__button" type="submit" disabled>+</button>
            </form>
        </div>
    )
}

export default Mark