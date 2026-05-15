import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function Dashboard() {

    const [netuid, setNetuid] = useState(1);
    const [loading, setLoading] = useState(false);
    const [neurons, setNeurons] = useState([]);
    const [subData, setSubData] = useState(null);
    const [adding, setAdding] = useState([]);
    const [error, setError] = useState("");

    const add = async () => {
        try {
            const res = await axios.post("https://await-glamorous-wafer.ngrok-free.dev/add", {

                a: 1,
                b: "sample",
                c: 2.0,
                d: 3.0,
                e: 4.0,

            });
            setAdding(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.log(err);
        }
    };
    const loadSubnet = useCallback(async () => {

        try {

            setLoading(true);
            setError("");
            console.log(12)
            const res = await axios.get(
                `https://await-glamorous-wafer.ngrok-free.dev/subnet/${netuid}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                },
            }
            );
            console.log(34)
            setSubData(res.data);

            setNeurons(res.data.neurons || []);

        } catch (err) {

            setError(err.response?.data?.detail || err.message || "Failed to load subnet");
            console.log(err);

        } finally {

            setLoading(false);

        }
    }, [netuid]);

    useEffect(() => {
        loadSubnet();
    }, [loadSubnet]);

    const stats = [
        { label: "Subnet Price", value: subData?.price?.toFixed(6) || "0" },
        { label: "Tao In Pool", value: subData?.tao_in?.toFixed(4) || "0" },
        { label: "Alpha In Pool", value: subData?.alpha_in?.toFixed(4) || "0" },
        { label: "Tao Price", value: subData?.tao_price || "0" },
        { label: "Emission", value: subData?.emission?.toFixed(4) || "0" },
        { label: "Incentive Burn", value: subData?.Incentive_burn?.toFixed(4) || "0" },
        { label: "Validators", value: subData?.num_val || "0" },
        { label: "Miners", value: subData?.num_miner || "0" },
    ];

    return (
        <div className="dashboard-shell">
            <div className="aurora aurora-one" />
            <div className="aurora aurora-two" />
            <div className="dashboard-grid">
                <header className="hero-panel glass-panel">
                    <div>
                        <p className="eyebrow">Finney Network</p>
                        <h1>Bittensor Dashboard</h1>
                        <p className="hero-copy">
                            Live subnet telemetry with validator, miner, and emission signals.
                        </p>
                    </div>

                    <div className="control-row">
                        <label className="netuid-control">
                            <span>Netuid</span>
                            <input
                                type="number"
                                value={netuid}
                                onChange={(e) => setNetuid(e.target.value)}
                            />
                        </label>

                        <button className="neon-button" onClick={loadSubnet}>
                            {loading ? "Loading" : "Load"}
                        </button>
                    </div>
                </header>

                <section className="orbital-stage glass-panel" aria-label="Subnet activity animation">
                    <div className="pulse-core">
                        <span />
                        <span />
                        <span />
                    </div>
                    <div className="orbit orbit-a"><i /></div>
                    <div className="orbit orbit-b"><i /></div>
                    <div className="orbit orbit-c"><i /></div>
                    <div className="stage-caption">
                        <strong>{subData?.total_neurons || neurons.length || 0}</strong>
                        <span>Active neurons</span>
                    </div>
                </section>

                {error && <p className="error-banner">{error}</p>}

                <section className="stats-grid">
                    {stats.map((stat) => (
                        <div className="stat-card glass-panel" key={stat.label}>
                            <span>{stat.label}</span>
                            <strong>{stat.value}</strong>
                        </div>
                    ))}
                </section>

                <section className="table-panel glass-panel">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Subnet Map</p>
                            <h2>Neurons</h2>
                        </div>
                        <span>{neurons.length} rows</span>
                    </div>

                    <div className="table-wrap">
                        <table className="neon-table">
                            <thead>
                                <tr>
                                    <th>UID</th>
                                    <th>Role</th>
                                    <th>Stake</th>
                                    <th>Consensus</th>
                                    <th>Emission</th>
                                    <th>Hotkey</th>
                                </tr>
                            </thead>

                            <tbody>
                                {neurons.map((n) => (
                                    <tr key={n.uid}>
                                        <td>{n.uid}</td>
                                        <td>
                                            <span className={n.validator ? "role-pill validator" : "role-pill miner"}>
                                                {n.validator ? "Validator" : "Miner"}
                                            </span>
                                        </td>
                                        <td>{Number(n.stake || 0).toFixed(4)}</td>
                                        <td>{Number(n.consensus || 0).toFixed(4)}</td>
                                        <td>{Number(n.emission || 0).toFixed(4)}</td>
                                        <td className="hotkey-cell">{n.hotkey}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="table-panel glass-panel">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Mongo Sample</p>
                            <h2>Added Rows</h2>
                        </div>
                        <button className="ghost-button" onClick={add}>Add</button>
                    </div>

                    <div className="table-wrap">
                        <table className="neon-table compact">
                            <thead>
                                <tr>
                                    <th>A</th>
                                    <th>B</th>
                                    <th>C</th>
                                    <th>D</th>
                                    <th>E</th>
                                </tr>
                            </thead>

                            <tbody>
                                {adding.map((n, index) => (
                                    <tr key={`${n.a}-${index}`}>
                                        <td>{n.a}</td>
                                        <td>{n.b}</td>
                                        <td>{Number(n.c || 0).toFixed(4)}</td>
                                        <td>{Number(n.d || 0).toFixed(4)}</td>
                                        <td>{Number(n.e || 0).toFixed(4)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
