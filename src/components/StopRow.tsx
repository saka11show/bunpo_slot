export function StopRow() {
  return (
    <div className="stopGrid">
      <div className="stopDummy" aria-hidden="true" />
      <button className="stopBtn stopBtn--mizen" type="button">STOP</button>
      <button className="stopBtn stopBtn--renyo" type="button">STOP</button>
      <button className="stopBtn stopBtn--shushi" type="button">STOP</button>
      <button className="stopBtn stopBtn--rentai" type="button">STOP</button>
      <button className="stopBtn stopBtn--izen" type="button">STOP</button>
      <button className="stopBtn stopBtn--meirei" type="button">STOP</button>
    </div>
  );
}
