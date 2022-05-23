const loadingStyle = {
  height: 800,
}

const Loading = () => {
  return (
    <div className="w-100 d-flex align-items-center justify-content-center" style={loadingStyle}>
      <div className="spinner" />
    </div>
  )
}

export default Loading
