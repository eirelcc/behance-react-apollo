import * as React from 'react';

const Preview = ({ src, name, country, city, state, covers }) => (
    <article>
        <div className="link dt w-100 bb b--black-10 pb2 mt2 dim blue">
            <div className="dtc w3">
                <img src={src} className="w2 h2 w3-ns h3-ns br-100" />
            </div>
            <div className="dtc v-top pl2">
                <h1 className="f6 f5-ns fw6 lh-title black mv0">{name}</h1>
                <h2 className="f6 fw4 mt2 mb0 black-60">
                    {city}, {country}
                    {state ? `, ${state}` : ''}
                </h2>
            </div>
            {covers &&
                covers.length && (
                    <div className="dtc cf w-50">
                        {covers.map(src => (
                            <div className="fl w-20" key={src}>
                                <img
                                    src={src}
                                    className="db w-100"
                                    height="100"
                                />
                            </div>
                        ))}
                    </div>
                )}
        </div>
    </article>
);

export default Preview;
