import * as React from 'react';
import styles from './Topbar.module.scss';
import { Link } from 'react-router-dom';

export default (class Topbar extends React.PureComponent {
	state = {};

	componentDidMount() {}

	render() {
		return (
			<div className={styles.main}>
				<ul className={styles.list}>
					<Link className={styles.item} to="/producto">
						<li className={styles.item}> Productos</li>
					</Link>
					<Link className={styles.item} to="/cliente">
						<li className={styles.item}> Clientes</li>
					</Link>
					<Link className={styles.item} to="/inventario">
						<li className={styles.item}> Inventario</li>
					</Link>
					<Link className={styles.item} to="/pedido">
						<li className={styles.item}> Pedido</li>
					</Link>
					<Link className={styles.item} to="/grafica">
						<li className={styles.item}> Grafica</li>
				</Link>
				</ul>
			</div>
		);
	}
});
