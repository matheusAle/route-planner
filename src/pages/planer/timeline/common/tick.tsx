export function Tick({tick, count, item}: any) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 32,
          width: 1,
          height: 5,
          backgroundColor: 'rgb(200,200,200)',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 38,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {item?.name}
      </div>
    </div>
  )
}
