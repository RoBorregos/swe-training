const Resume = () => {
    return (
        <div className="font-light">
            <h1 className="text-lg font-semibold">Tips</h1>
            <p>
                The resume is probably the most important part of an application.
                It is said that recruiters take about 8 seconds to review a resume.
                It is also said that some companies filter resumes with automatic reviews.
                Therefore, there are some key points to consider when writing a resume:
            </p>
            <ul className="list-disc pl-6">
                <li>Keep it short, only one page.</li>
                <li>Use a clean and professional format. There are several templates and tools, just make sure to choose what fits best for you.</li>
                <li>Use bullets and short sentences.</li>
                <li>
                    Use action verbs for each bullet point and consider the tense (Developing - Developed) <br />
                    <a className="underline text-accent" href="https://capd.mit.edu/resources/resume-action-verbs/" target="_blank">Example action verbs</a>
                </li>
                <li>Order by date. Most recent at the top.</li>
                <li>Use XYZ: &quot;Accomplished [X] as measured by [Y], by doing [Z].&quot; If possible use numbers to show impact (2nd place out of 10 teams, improved precision by 10%, etc).</li>
            </ul>
            <br />
            <h1 className="text-lg font-semibold">Recommended sections</h1>
            <ul className="list-disc pl-6">
                <li><span className="text-green-500">Contact information</span> (name, email, phone number, LinkedIn, GitHub, etc).</li>
                <li><span className="text-green-500">Education:</span> As students, this should be the first section. If you&apos;re in your first years, might be relevant to include highschool. (school, degree, GPA, relevant courses (if relevant), expected graduation date).</li>
                <li><span className="text-green-500">Work Experience:</span> It is not always expected to have work experience, but if it existst, it should come just after education. (internships, work experience).</li>
                <li><span className="text-green-500">Projects:</span> Very important section (specially if you don&apos;t have work experience yet).</li>
                <li><span className="text-green-500">Extra sections:</span> Depending on your profile, you could add sections like: Leadership, Competitions, Volunteering, etc</li>
                <li><span className="text-green-500">Programming Languages</span> (recommended to include years you&apos;ve used the language)</li>
                <li><span className="text-green-500">Technologies/Tools:</span> list different tech you&apos;ve used that is relevant</li>
                <li><span className="text-green-500">Optional: Languages</span> (spoken languages with proficiency level)</li>
                <li><span className="text-green-500">Optional: Awards</span> (list of awards with the date)</li>
            </ul>
        </div>
    );
}

export default Resume;