/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Model from '../model.js';
import Controller from '../controller.js';
import ControllerCollection from '../controllercollection.js';
import IconView from '../iconview.js';

/**
 * The basic button controller class.
 *
 * @memberOf ui.button
 * @extends ui.Controller
 */

export default class Button extends Controller {
	constructor( model, view ) {
		super( model, view );

		if ( model.icon ) {
			this._setupIcon();
		}

		view.on( 'click', () => model.fire( 'execute' ) );
	}

	_setupIcon() {
		const childrenCollection = new ControllerCollection( 'children' );
		const iconViewModel = new Model();
		const icon = new Controller( null, new IconView( iconViewModel ) );

		iconViewModel.bind( 'icon' ).to( this.model );

		childrenCollection.add( icon );

		this.collections.add( childrenCollection );
	}
}

/**
 * The basic button model interface.
 *
 * @memberOf ui.button
 * @interface ButtonModel
 */

/**
 * The label of the button.
 *
 * @member {String} ui.button.ButtonModel#label
 */

/**
 * Whether the button is "on" (e.g. some feature which this button represents is currently enabled).
 *
 * @member {Boolean} ui.button.ButtonModel#isOn
 */

/**
 * Whether the button is enabled (can be clicked).
 *
 * @member {Boolean} ui.button.ButtonModel#isEnabled
 */

/**
 * Fired when the button action should be executed.
 *
 * @event ui.button.ButtonModel#execute
 */
