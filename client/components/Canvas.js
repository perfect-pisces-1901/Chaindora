import React from 'react'

class Canvas extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount () {
    console.log('Canvas componentDidMount ', this.canvas)
    const canvas = this.canvas
    this.ctx = canvas.getContext('2d')
  }

  onClick (ev) {
    console.log('Pop! click', ev)
  }

  render() {
      return (
        <div>
          <canvas ref={c => { this.canvas = c }} width={640} height={425} />
          <button type="button" onClick={this.onClick}>Pop!</button>
        </div>
      )
    }
  }
  export default Canvas
