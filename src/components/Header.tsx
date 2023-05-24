import BXHeader from "@carbon/web-components/es/components-react/ui-shell/header";
import BXHeaderName from "@carbon/web-components/es/components-react/ui-shell/header-name";
import BXHeaderMenuButton from "@carbon/web-components/es/components-react/ui-shell/header-menu-button";
import BXHeaderNav from "@carbon/web-components/es/components-react/ui-shell/header-nav";
import BXHeaderNavItem from "@carbon/web-components/es/components-react/ui-shell/header-nav-item";
import BXHeaderMenu from "@carbon/web-components/es/components-react/ui-shell/header-menu";
import BXHeaderMenuItem from "@carbon/web-components/es/components-react/ui-shell/header-menu-item";

export function Header() {
  return (
    <BXHeader>
      <BXHeaderMenuButton
        buttonLabelActive="Close menu"
        buttonLabelInactive="Open menu"
      />
      <BXHeaderName href="javascript:void 0" prefix="Dota">
        [Viz]
      </BXHeaderName>
      <BXHeaderNav>
        <BXHeaderNavItem href="javascript:void 0">Link 1</BXHeaderNavItem>
        <BXHeaderNavItem href="javascript:void 0">Link 2</BXHeaderNavItem>
        <BXHeaderNavItem href="javascript:void 0">Link 3</BXHeaderNavItem>
        <BXHeaderMenu menuLabel="Link 4" triggerContent="Link 4">
          <BXHeaderMenuItem href="javascript:void 0">
            Sub-link 1
          </BXHeaderMenuItem>
          <BXHeaderMenuItem href="javascript:void 0">
            Sub-link 2
          </BXHeaderMenuItem>
          <BXHeaderMenuItem href="javascript:void 0">
            Sub-link 3
          </BXHeaderMenuItem>
        </BXHeaderMenu>
      </BXHeaderNav>
    </BXHeader>
  );
}
