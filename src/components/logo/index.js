import React, {
	Component
} from 'react'

import LogoImg from './job.png'

import './index.css'

class Logo extends Component {
	render() {
		return (
			<div className="logo-container">
				<img src={LogoImg} alt=""/>
			</div>
		)
	}
}

export default Logo;