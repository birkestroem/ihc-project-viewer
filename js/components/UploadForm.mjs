// UploadForm.mjs
import { html, Component } from 'https://unpkg.com/htm/preact/standalone.module.js';
import { StoreContext } from '../StoreContext.mjs';

export default class UploadForm extends Component {
  static contextType = StoreContext;

  translateIhcId = (ihcId) => {
    const hex = ihcId.substring(1);
    return {
      hex,
      dec: parseInt(hex, 16),
    };
  }

  parseProductDatalineXML = (xml) => {
    // console.log(xml);

    // <product_dataline id="_0x258453" product_identifier="_0x2108" name="LK FUGA Statustryk 4 tast 4 dioder" locked="yes" enduser_report="yes" icon="_0x85" note="Statustryk 4 tast, 2 røde dioder og 2 grønne" helpfile="" position="" cabletype="" cablenumber="" documentation_tag="" power_group="" udf="">
    //     <dataline_input id="_0x25855a" name="Tryk (øverst venstre)" address_dataline="_0x55" note="" inivalue="off" cable_colour="" udf=""/>
    //     <dataline_output id="_0x25895b" name="Rød LED (øverst venstre)" backup="yes" type="led" address_dataline="_0x2d" note="" inivalue="off" cable_colour="" udf=""/>
    //  </product_dataline>

    // <product_dataline id="_0x41d653" product_identifier="_0x2202" name="Lampeudtag" locked="yes" icon="_0x86" position="Spot i forhave" enduser_report="no" note="" helpfile="" cabletype="" cablenumber="" documentation_tag="" power_group="" udf="">
    //     <dataline_output id="_0x41d75b" name="Udgang" backup="yes" address_dataline="_0x78" note="" inivalue="off" type="unspecified" cable_colour="" udf="">
    //        <link_to_resource id="_0x41da2c" name="Følg Link" icon="_0x4a" link="_0x41d92d" note="" udf=""/>
    //        <link_from_resource id="_0x4d632d" name="Følg Link" icon="_0x47" link="_0x4d642c" note="" udf=""/>
    //     </dataline_output>
    //     <scenes id="_0x41d849" name="Scenarier" scene_resource="_0x41d75b" note="" udf=""/>
    //  </product_dataline>

    const obj = {
      id: this.translateIhcId(xml.getAttribute('id')),
      productIdentifier: this.translateIhcId(xml.getAttribute('product_identifier')),
      name: xml.getAttribute('name'),
      locked: xml.getAttribute('locked') === 'yes',
      icon: this.translateIhcId(xml.getAttribute('icon')),
      position: xml.getAttribute('position'),
      inputs: [],
      outputs: [],
      scenes: [],
    };

    for (const child of xml.childNodes) {
      if (child.nodeType !== 1) {
        continue;
      }

      switch (child.nodeName) {
        case 'dataline_input':
          obj.inputs.push({
            id: this.translateIhcId(child.getAttribute('id')),
            name: child.getAttribute('name'),
            addressDataline: this.translateIhcId(child.getAttribute('address_dataline')),
            note: child.getAttribute('note'),
            initialValue: child.getAttribute('inivalue') === 'on',
            cableColour: child.getAttribute('cable_colour'),
          });
          break;
        case 'dataline_output':
          obj.outputs.push({
            id: this.translateIhcId(child.getAttribute('id')),
            name: child.getAttribute('name'),
            backupValue: child.getAttribute('backup') === 'yes',
            addressDataline: this.translateIhcId(child.getAttribute('address_dataline')),
            note: child.getAttribute('note'),
            initialValue: child.getAttribute('inivalue') === 'on',
            type: child.getAttribute('type'),
            cableColour: child.getAttribute('cable_colour'),
            cabletype: child.getAttribute('cabletype'),
            cablenumber: child.getAttribute('cablenumber'),
            documentationTag: child.getAttribute('documentation_tag'),
            powerGroup: child.getAttribute('power_group'),
            // Children links
          });
          break;
        case 'scenes':
          obj.scenes.push({
            id: this.translateIhcId(child.getAttribute('id')),
            name: child.getAttribute('name'),
            sceneResource: this.translateIhcId(child.getAttribute('scene_resource')),
            note: child.getAttribute('note'),
          });
          break;
        default:
          throw new Error(`Unknown node name: ${child.nodeName}`);
      }
    }

    return obj;
  }

  parseProductAirlinkXML = (xml) => {
    const obj = {
      id: this.translateIhcId(xml.getAttribute('id')),
      productIdentifier: this.translateIhcId(xml.getAttribute('product_identifier')),
      deviceType: this.translateIhcId(xml.getAttribute('device_type')),
      serialnumber: this.translateIhcId(xml.getAttribute('serialnumber')),
      name: xml.getAttribute('name'),
      locked: xml.getAttribute('locked') === 'yes',
      icon: this.translateIhcId(xml.getAttribute('icon')),
      position: xml.getAttribute('position'),
      inputs: [],
      relays: [],
      scenes: [],
      settings: [],
    };

    //console.log(xml);
    // <product_airlink id="_0x661854" product_identifier="_0x4304" device_type="_0x808" name="Lampeudtag dimmer" serialnumber="_0x640821060242" locked="yes" position="Sengelampe Jesper" icon="_0x86" enduser_report="no" note="" helpfile="" documentation_tag="" power_group="" udf="">
    //   <airlink_dimmer_increase id="_0x66195f" name="Tænd / regulér op" address_channel="_0x1" note="" udf=""/>
    //   <airlink_dimmer_decrease id="_0x661a60" name="Sluk / regulér ned" address_channel="_0x1" note="" udf=""/>
    //   <airlink_dimming id="_0x661b5d" name="Lys niveau" address_channel="_0x1" note="" udf=""/>
    //   <light_indication id="_0x661c1d" name="Lys indikering" note="'On' når lysdæmperen er tændt" note-2="" udf="">
    //       <link_from_resource id="_0x71ff2d" name="Følg Link" icon="_0x47" link="_0x72002c" note="" udf=""/>
    //   </light_indication>
    //   <scenes id="_0x661d49" name="Scenarier/regulering" scene_resource="_0x661b5d" note="" udf="">
    //       <scene_dimmer id="_0x6a5b4c" name="Scenarie link" dimming_value="35" ramptime_ms="1000" link="_0x6a5c4b" delay_ms="0" note="" udf=""/>
    //       <scene_dimmer id="_0x6a5d4c" name="Scenarie link" dimming_value="15" ramptime_ms="1000" link="_0x6a5e4b" delay_ms="0" note="" udf=""/>
    //       <scene_dimmer id="_0x83274c" name="Scenarie link" dimming_value="100" ramptime_ms="1000" link="_0x83284b" delay_ms="0" note="" udf=""/>
    //   </scenes>
    //   <dimmer_settings id="_0x661e6e" name="" icon="_0x0" note="" udf="">
    //       <dimmer_setting_minimum_value id="_0x661f71" value="22" maximum="100" minimum="0" udf=""/>
    //       <dimmer_setting_maximum_value id="_0x662072" value="100" maximum="100" minimum="0" udf=""/>
    //       <dimmer_setting_fade_rate_up id="_0x66216f" value="700" minimum="200" maximum="60000" udf=""/>
    //       <dimmer_setting_fade_rate_down id="_0x662270" value="700" minimum="200" maximum="60000" udf=""/>
    //       <dimmer_setting_dimming_rate id="_0x662373" value="5000" minimum="2000" maximum="10000" udf=""/>
    //       <dimmer_setting_load_mode id="_0x662474" value="auto" udf=""/>
    //   </dimmer_settings>
    // </product_airlink>
    for (const child of xml.childNodes) {
      if (child.nodeType !== 1) {
        continue;
      }

      switch (child.nodeName) {
        case 'airlink_input':
          obj.inputs.push({
            id: this.translateIhcId(child.getAttribute('id')),
            name: child.getAttribute('name'),
            addressChannel: this.translateIhcId(child.getAttribute('address_channel')),
            note: child.getAttribute('note'),
          });
          break;

        case 'airlink_relay':
          obj.relays.push({
            id: this.translateIhcId(child.getAttribute('id')),
            name: child.getAttribute('name'),
            addressChannel: this.translateIhcId(child.getAttribute('address_channel')),
            note: child.getAttribute('note'),
          });
          break;

        case 'airlink_dimmer_increase':
        case 'airlink_dimmer_decrease':
        case 'airlink_dimming':
        case 'light_indication':
        case 'scenes':
        case 'dimmer_settings':
          // Ignore
          break;

        default:
          throw new Error(`Unknown node name: ${child.nodeName}`);
      }
    }

    return obj;
  }

  parseFuctionblockXML = (xml) => {
    const obj = {
      id: this.translateIhcId(xml.getAttribute('id')),
      name: xml.getAttribute('name'),
      note: xml.getAttribute('note'),
      locked: xml.getAttribute('locked') === 'yes',
      icon: this.translateIhcId(xml.getAttribute('icon')),
      inputs: [],
      outputs: [],
      settings: [],
      internalSettings: [],
      programs: [],
    };

    for (const input of xml.getElementsByTagName('inputs')) {
      obj.inputs.push({
        id: this.translateIhcId(input.getAttribute('id')),
        name: input.getAttribute('name'),
        icon: this.translateIhcId(input.getAttribute('icon')),
        note: input.getAttribute('note'),
      });
    }

    for (const output of xml.getElementsByTagName('outputs')) {
      obj.outputs.push({
        id: this.translateIhcId(output.getAttribute('id')),
        name: output.getAttribute('name'),
        icon: this.translateIhcId(output.getAttribute('icon')),
        note: output.getAttribute('note'),
      });
    }

    for (const setting of xml.getElementsByTagName('settings')) {
      obj.settings.push({
        id: this.translateIhcId(setting.getAttribute('id')),
        name: setting.getAttribute('name'),
        icon: this.translateIhcId(setting.getAttribute('icon')),
        note: setting.getAttribute('note'),
      });
    }

    for (const internalSetting of xml.getElementsByTagName('internalsettings')) {
      obj.internalSettings.push({
        id: this.translateIhcId(internalSetting.getAttribute('id')),
        name: internalSetting.getAttribute('name'),
        icon: this.translateIhcId(internalSetting.getAttribute('icon')),
        note: internalSetting.getAttribute('note'),
      });
    }

    for (const program of xml.getElementsByTagName('programs')) {
      obj.programs.push({
        id: this.translateIhcId(program.getAttribute('id')),
        name: program.getAttribute('name'),
        icon: this.translateIhcId(program.getAttribute('icon')),
        note: program.getAttribute('note'),
      });
    }

    return obj;
  }

  parseGroupXML = (xml) => {
    const obj = {
      id: this.translateIhcId(xml.getAttribute('id')),
      name: xml.getAttribute('name'),
      note: xml.getAttribute('note'),
      icon: this.translateIhcId(xml.getAttribute('icon')),
      functions: [],
      datalineProducts: [],
      airlinkProducts: [],
    };

    for (const child of xml.childNodes) {
      if (child.nodeType !== 1) {
        continue;
      }

      switch (child.nodeName) {
        case 'product_dataline':
          obj.datalineProducts.push(this.parseProductDatalineXML(child));
          break;

        case 'product_airlink':
          obj.airlinkProducts.push(this.parseProductAirlinkXML(child));
          break;

        case 'functionblock':
          obj.functions.push(this.parseFuctionblockXML(child));
          break;

        default:
          throw new Error(`Unknown node name: ${child.nodeName}`);
      }
    }

    return obj;
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];

    const { addIHCProjectGroup, clearIHCProjectGroups } = this.context.action;
    if (file) {
      const reader = new FileReader();
      const parser = new DOMParser();

      reader.onload = (loadEvent) => {
        const xml = parser.parseFromString(loadEvent.target.result, 'text/xml');
        const groupsXML = document.evaluate('/utcs_project/groups/group', xml, null, XPathResult.ANY_TYPE, null);
        let groupXML = groupsXML.iterateNext();
        while (groupXML) {
          addIHCProjectGroup(this.parseGroupXML(groupXML));
          groupXML = groupsXML.iterateNext();
        }
      };

      reader.readAsText(file, 'ISO-8859-1');
    }
  }

  render() {
    return html`
    <div class="container">
        <label for="ihc-project-file" class="form-label">IHC Project File</label>
        <input
            type="file"
            accept=".vis"
            class="form-control"
            id="ihc-project-file"
            onChange=${this.handleFileChange}
        />
    </div>
    `;
  }
}
