// React
import { PureComponent } from 'react'

// Librarys
import ReportIcon from '@mui/icons-material/Report'

// Types
import { BoundaryState } from '@types'

// Interfaces
import { ChildrenProp } from '@interfaces'

const boundaryStyle = {
  borderRadius: '.5em',
  backgroundColor: 'var(--bg-opacity-dark)',
}

export default class ErrorBoundary extends PureComponent<ChildrenProp, BoundaryState> {
  _isMounted: boolean = false
  state = {
    error: null,
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentDidCatch(error: any) {
    // Capturar el error en caso se haya montado el componente
    this._isMounted && this.setState({ error: error.message })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    if (this.state.error) {
      return (
        <div className="d-flex h-100 py-4 align-items-center justify-content-center  flex-column text-muted text-center shadow-opacity-dark" style={boundaryStyle}>
          <ReportIcon className="mb-1 fs-4 text-danger" />
          <h4 className="text-secondary">Application error:</h4>
          <code className="col-10 mx-auto">{JSON.stringify(this.state.error)}</code>
        </div>
      )
    }

    return this.props.children
  }
}
