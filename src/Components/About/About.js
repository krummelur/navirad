import React, { Component } from "react";
import "./About.css";

class About extends Component {
    render() {
        return (
            <div className="about-container">
                <button type="button" onClick={() => {console.log("should navigate to radarview")}}>Go to radar view</button>
                <div className="title">
                    About NaviRad
                </div>

                <div className="subheading">
                    The app
                </div>

                <div className="text">
                    NaviRad is an interactive radar simulator intended for training. The intended audience is those interested in learning
                    how a radar's view differs from reality and a chart.<p/>

                    The radar view is created with a 2D raytracer and height maps from Tilezen. This method has the potential to create very
                    accurate charts, but to mimic an actual radar some limitations have been added; lobe width, constructive interference,
                    rain clutter.
                </div>

                <div className="subheading">
                    The team
                </div>

                <div className="text">
                    NaviRad is created as a team project at Royal Institute of Technology in the course Interaction Programming DH2642.<p/>
                    The team consists of:<br/>
                    Magnus Fredriksson<br/>
                    Adam Liliemark<br/>
                    Fredrik Öberg<br/>
                </div>

                <div className="subheading">
                    The code
                </div>

                <div className="text">
                    The code is released under GNU General Public License 3.0.
                    The complete source code for this project can be found at: Link to final repo
                </div>



            </div>
        );
    }
}

export default About;
