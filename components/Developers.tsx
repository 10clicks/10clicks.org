export default function DevelopersDescription() {
    return (
      <div className="lg:w-2/3 p-4 mx-auto mt-12">
        <div>
          <h1 className="font-normal text-2xl">Philosophy</h1>
        </div>
        <div className="flex flex-col gap-4 mt-4 items-center">
        <p className="font-normal" style={{
          color: "#888888"
        }}>
          <br />Test, <br />
          Ben and Oleks go below
          <br /><br />
          Best regards,
          Benjamin DeWeese van Schooneveld, Oleksandr Gorpynich
          <br /><br />
          Below are the listed requisites for happiness.
        </p>
        <ul className="font-normal mr-auto" style={{
          color: "#888888"
        }}>
          <li>Adequate sleep.</li>
          <li>Fulfilling work.</li>
          <li>Productive alone time.</li>
          <li>Fun social time.</li>
          <li>Good food.</li>
          <li>Physical satisfaction.</li>
          <li>Strenuous exercise.</li>
          <li>Learning something new.</li>
          <li>Have an end goal.</li>
        </ul>
        </div>
      </div>
    )
  }