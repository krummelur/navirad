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
                        <div>The site is created with React as framework. It's a single page application that uses different APIs to function.<p/>

                            <a href="https://firebase.google.com/">Firebase</a> provides authentication, hosting and persisting user data.<p/>

                            <a href="https://maps.google.com">Google Maps</a> is used for the large main map and the small map in the radar view.<p/>

                            <a href="https://www.nextzen.org/">TileZen Heightmap</a> is the map that the radar renders from.<p/>

                            <a href="https://carto.com/">CartoDB</a> is used to show the map overlay in the radar.<p/>

                            <a href="https://onwater.io">OnWater</a> determines whether a position is on land or water.<p/>

                            <a href="https://www.aishub.net">AISHub</a> is used to fetch other, real, boats. The boats transmit their position (and metadata) over VHF via AIS, and AISHub provides these feeds on the internet.<br/>
                            A special thanks to <a href="https://www.vassaro.se">Vässarö</a> for providing us with a raw AIS feed, which was needed to gain access to the AISHub API.

                        </div>



                    }
                    id="site"
                />
                <Section
                    title="The Code"
                    content={
                        <div>The code is released under GNU General Public License 3.0.<p/>

                            It is written in JavaScript (ES6) and React.<p/>

                            The complete source code for this project can be found at our <a href="https://gits-15.sys.kth.se/adamlil/dh2642-proj">git repository</a><p/>

                            The project's two releases, mid project and final, can be found under the releases tab.
                        </div>
                    }
                    id="code"
                />
                <Section
                    title="The Team"
                    content={
                        <div> NaviRad is created as a team project at Royal Institute of Technology, Stockholm, Sweden. It is a part in the course Interaction Programming DH2642.<p/>
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
