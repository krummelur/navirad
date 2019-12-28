import React, { Component } from "react";
import "./About.css";
import Section from "./Section";

class About extends Component {

    render() {
        return (
            <div className="about-container">
                <Section
                    title="The Radar"
                    content={
                        <div>NaviRad is an interactive radar simulator intended for training. The intended audience is those interested in learning
                            how a radar's view differs from reality and a chart.<p/>

                            The radar view is created with a 2D raytracer and height maps from Tilezen. This method has the potential to create very
                            accurate charts, but to mimic an actual radar some limitations have been added; lobe width, constructive interference,
                            rain clutter.<p/>

                            The map view is an embedded Google Map with custom marker behaviour and infowindow.<p/>
                        </div>
                    }
                    id="radar"
                />
                <Section
                    title="The Site"
                    content={
                        "blablabla"
                    }
                    id="site"
                />
                <Section
                    title="The Code"
                    content={
                        <div>The code is released under GNU General Public License 3.0.
                            The complete source code for this project can be found at our <a style={{color: 'lightgray'}} href="https://gits-15.sys.kth.se/adamlil/dh2642-proj">git repository</a>
                        </div>
                    }
                    id="code"
                />
                <Section
                    title="The Team"
                    content={
                        <div> NaviRad is created as a team project at Royal Institute of Technology in the course Interaction Programming DH2642.<p/>
                            The team consists of:<br/>
                            Magnus Fredriksson<br/>
                            Adam Liliemark<br/>
                            Fredrik Öberg<br/>
                        </div>
                    }
                    id="team"
                />
            </div>
        );
    }
}

export default About;
