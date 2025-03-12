// Charger plotly.js uniquement si nécessaire
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Charger `react-plotly.js` dynamiquement sans SSR
const PlotlyComponent = dynamic(() => import("react-plotly.js"), { ssr: false });

interface Props {
  code: string;
}

const PlotlyDisplay = ({ code }: Props) => {
  const [Plotly, setPlotly] = useState<any>(null);

  useEffect(() => {
    // Import dynamique de plotly.js pour éviter le chargement global
    import("plotly.js-basic-dist").then((mod) => setPlotly(mod.default));
  }, []);

  if (!Plotly) return <p>Loading...</p>;

  const DATA_JSON = JSON.parse(code);
  const { data, layout } = {
    data: DATA_JSON.data || [],
    layout: DATA_JSON.layout || {},
  };

  return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <PlotlyComponent
            className="flex h-full w-full flex-col items-center justify-center"
            data={data}
            layout={layout}
            style={{ width: "100%", height: "100%" }}
        />
      </div>
  );
};

export default PlotlyDisplay;
