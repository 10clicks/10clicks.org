export default function Philosophy() {
  return (
    <div className="lg:w-2/3 p-4 mx-auto mt-12">
      <div>
        <h1 className="font-normal text-2xl">Philosophy</h1>
      </div>
      <div className="flex flex-col gap-4 mt-4 items-center">
      <p className="font-normal" style={{
        color: "#888888"
      }}>
        Dear valued site patron, <br />
        We would like to explain the philosophy behind these items. <br />
        Going into our senior year of high school Ben, one of the developers, was unhappy with how he spent his three of four years. 
        Ben had made good friends and memories but near the end of it he realized the importance of doing what you enjoy, 
        not what you think looks good on a resume. He pitched his ideals of a content life to his good friend 
        and co-developer Oleksandr Gorpynich with strong success. <br /><br />

        Time passed and we decided to create a project to share it. 
        Together we constructed a sort of “to-do list” of tasks which we find best satisfies the requirements for a prosperous well-being. 
        10clicks.org is a digital embodiment of what we think a human needs to be happy, or at least content.
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