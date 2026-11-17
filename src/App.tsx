import { ResultArea } from './components/ResultArea';
import { PayoutForm } from './payout/PayoutForm';

export function App() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Send a payout</h1>
        <p>Test environment. No real money moves.</p>
      </header>

      <main className="page-content">
        <section className="card" aria-labelledby="details-heading">
          <h2 id="details-heading">Payout details</h2>
          <PayoutForm />
        </section>

        <section className="card" aria-labelledby="result-heading">
          <h2 id="result-heading">Result</h2>
          <ResultArea>Submit the form to see the result here.</ResultArea>
        </section>
      </main>
    </div>
  );
}
