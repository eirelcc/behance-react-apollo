import * as React from 'react';

const Preview = ({ src, name, covers }) => (
    <article>
        <div className="link dt w-100 bb b--black-10 pb2 mt2 dim blue">
            <div className="dtc w3">
                <img src={src} className="db w-100" />
            </div>
            <div className="dtc v-top pl2">
                <h1 className="f6 f5-ns fw6 lh-title black mv0">{name}</h1>
                <h2 className="f6 fw4 mt2 mb0 black-60">
                    Josef Müller-Brockmann
                </h2>
                <dl className="mt2 f6">
                    <dt className="clip">Price</dt>
                    <dd className="ml0">$75.00</dd>
                </dl>
            </div>
            {covers &&
                covers.length && (
                    <div className="dtc w3">
                        {covers.map(src => (
                            <img key={src} src={src} className="db w-100" />
                        ))}
                    </div>
                )}
        </div>
    </article>
);

export default Preview;
