<script setup>
import { ref, onMounted } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import ApplicationMark from '@/Components/ApplicationMark.vue';
import Banner from '@/Components/Banner.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { createPopper } from '@popperjs/core'; // Importamos createPopper de @popperjs/core

defineProps({
    title: String,
});

const showingNavigationDropdown = ref(false);
const open = ref(true);

const switchToTeam = (team) => {
    router.put(route('current-team.update'), {
        team_id: team.id,
    }, {
        preserveState: false,
    });
};

const logout = () => {
    router.post(route('logout'));
};

onMounted(() => {
    const ANIMATION_DURATION = 300;

    const SIDEBAR_EL = document.getElementById("sidebar");

    const SUB_MENU_ELS = document.querySelectorAll(
        ".mb__menu > ul > .mb__menu-item.mb__sub-menu"
    );

    const FIRST_SUB_MENUS_BTN = document.querySelectorAll(
        ".mb__menu > ul > .mb__menu-item.mb__sub-menu > a"
    );

    const INNER_SUB_MENUS_BTN = document.querySelectorAll(
        ".mb__menu > ul > .mb__menu-item.mb__sub-menu .mb__menu-item.mb__sub-menu > a"
    );

    class PopperObject {
        instance = null;
        reference = null;
        popperTarget = null;

        constructor(reference, popperTarget) {
            this.init(reference, popperTarget);
        }

        init(reference, popperTarget) {
            this.reference = reference;
            this.popperTarget = popperTarget;
            this.instance = createPopper(this.reference, this.popperTarget, { // Usamos createPopper en lugar de Popper.createPopper
                placement: "right",
                strategy: "fixed",
                resize: true,
                modifiers: [
                    {
                        name: "computeStyles",
                        options: {
                            adaptive: false
                        }
                    },
                    {
                        name: "flip",
                        options: {
                            fallbackPlacements: ["left", "right"]
                        }
                    }
                ]
            });

            document.addEventListener(
                "click",
                (e) => this.clicker(e, this.popperTarget, this.reference),
                false
            );

            const ro = new ResizeObserver(() => {
                this.instance.update();
            });

            ro.observe(this.popperTarget);
            ro.observe(this.reference);
        }

        clicker(event, popperTarget, reference) {
            if (
                SIDEBAR_EL.classList.contains("mb__collapsed") &&
                !popperTarget.contains(event.target) &&
                !reference.contains(event.target)
            ) {
                this.hide();
            }
        }

        hide() {
            this.instance.state.elements.popper.style.visibility = "hidden";
        }
    }

    class Poppers {
        subMenuPoppers = [];

        constructor() {
            this.init();
        }

        init() {
            SUB_MENU_ELS.forEach((element) => {
                this.subMenuPoppers.push(
                    new PopperObject(element, element.lastElementChild)
                );
                this.closePoppers();
            });
        }

        togglePopper(target) {
            if (window.getComputedStyle(target).visibility === "hidden")
                target.style.visibility = "visible";
            else target.style.visibility = "hidden";
        }

        updatePoppers() {
            this.subMenuPoppers.forEach((element) => {
                element.instance.state.elements.popper.style.display = "none";
                element.instance.update();
            });
        }

        closePoppers() {
            this.subMenuPoppers.forEach((element) => {
                element.hide();
            });
        }
    }

    const slideUp = (target, duration = ANIMATION_DURATION) => {
        const { parentElement } = target;
        parentElement.classList.remove("mb__open");
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = `${duration}ms`;
        target.style.boxSizing = "border-box";
        target.style.height = `${target.offsetHeight}px`;
        target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = "none";
            target.style.removeProperty("height");
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
        }, duration);
    };

    const slideDown = (target, duration = ANIMATION_DURATION) => {
        const { parentElement } = target;
        parentElement.classList.add("mb__open");
        target.style.removeProperty("display");
        let { display } = window.getComputedStyle(target);
        if (display === "none") display = "block";
        target.style.display = display;
        const height = target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = "border-box";
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = `${duration}ms`;
        target.style.height = `${height}px`;
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        window.setTimeout(() => {
            target.style.removeProperty("height");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
        }, duration);
    };

    const slideToggle = (target, duration = ANIMATION_DURATION) => {
        if (window.getComputedStyle(target).display === "none")
            return slideDown(target, duration);
        return slideUp(target, duration);
    };

    const PoppersInstance = new Poppers();

    const updatePoppersTimeout = () => {
        setTimeout(() => {
            PoppersInstance.updatePoppers();
        }, ANIMATION_DURATION);
    };

    document.getElementById("btn-collapse").addEventListener("click", () => {
        open.value = !open.value;
        SIDEBAR_EL.classList.toggle("mb__collapsed");
        PoppersInstance.closePoppers();
        if (SIDEBAR_EL.classList.contains("mb__collapsed"))
            FIRST_SUB_MENUS_BTN.forEach((element) => {
                element.parentElement.classList.remove("mb__open");
            });

        updatePoppersTimeout();
    });

    document.getElementById("btn-toggle").addEventListener("click", () => {
        SIDEBAR_EL.classList.toggle("mb__toggled");

        updatePoppersTimeout();
    });

    document.getElementById("overlay").addEventListener("click", () => {
        SIDEBAR_EL.classList.toggle("mb__toggled");
    });

    const defaultOpenMenus = document.querySelectorAll(".mb__menu-item.mb__sub-menu.mb__open");

    defaultOpenMenus.forEach((element) => {
        element.lastElementChild.style.display = "block";
    });

    FIRST_SUB_MENUS_BTN.forEach((element) => {
        element.addEventListener("click", () => {
            if (SIDEBAR_EL.classList.contains("mb__collapsed"))
                PoppersInstance.togglePopper(element.nextElementSibling);
            else {
                const parentMenu = element.closest(".mb__menu.mb__open-current-submenu");
                if (parentMenu)
                    parentMenu
                        .querySelectorAll(":scope > ul > .mb__menu-item.mb__sub-menu > a")
                        .forEach(
                            (el) =>
                                window.getComputedStyle(el.nextElementSibling).display !==
                                    "none" && slideUp(el.nextElementSibling)
                        );
                slideToggle(element.nextElementSibling);
            }
        });
    });

    INNER_SUB_MENUS_BTN.forEach((element) => {
        element.addEventListener("click", () => {
            slideToggle(element.nextElementSibling);
        });
    });
});
</script>

<template>
  <div class="mb__layout mb__has-sidebar mb__fixed-sidebar mb__fixed-header">
    <aside id="sidebar" class="mb__sidebar mb__break-point-sm bg-dark-main">
      <a id="btn-collapse" class="mb__sidebar-collapser"><i class="ki-duotone ki-black-left"></i></a>
      <div class="mb__sidebar-layout">
        <div class="px-5 pt-7">
            <div class="inline-flex items-center justify-center">
             <div>
                <span class="cursor-pointer block float-left mr-2">
                    <i :class="['ki-duotone ki-purchase text-mb-success text-4xl rounded duration-500', !open && 'rotate-[360deg]']">
                    <span class="path1 text-mb-success"></span>
                    <span class="path2"></span>
                    </i>
                </span>
             </div>
             <h1 :class="['text-white origin-left font-bold text-2xl duration-300', !open && 'scale-0']">Flexivent</h1>
          </div>
          <!-- <div :class="['flex items-center py-2', open ? 'mt-5 px-3 border border-gray-800 rounded' : 'mt-7 justify-center']"> -->
				<!-- <div class="flex items-center py-2 mt-5"> -->
				<!-- <div class="flex items-center justify-center min-w-9 h-9 bg-mb-success-100 text-mb-success rounded">
					<span class="text-lg">M</span>
				</div>
				<div :class="['ml-4 duration-200', !open && 'hidden ml-0']"> -->
					<!-- <div class="ml-4 sidebar-username"> -->
					<!-- <h2 class="text-white text-md font-semibold whitespace-nowrap">Marcial Cahuaya</h2>
					<p class="text-gray-400 text-sm">CEO</p>
				</div>
			</div> -->
        </div>
        <div class="mb__sidebar-content">
          <nav class="mb__menu mb__open-current-submenu">
            <ul>
              <li class="mb__menu-header mt-2"><span> GENERAL </span></li>
              <li class="mb__menu-item mb__sub-menu">
                <a href="#">
                  <span class="mb__menu-icon">
                    <i class="ri-vip-diamond-fill"></i>
                  </span>
                  <span class="mb__menu-title">Components</span>
                  <span class="mb__menu-suffix">
                    <span class="mb__badge mb__primary">Hot</span>
                  </span>
                </a>
                <div class="mb__sub-menu-list">
                  <ul>
                    <li class="mb__menu-item">
                      <a href="#">
                        <span class="mb__menu-title">Grid</span>
                      </a>
                    </li>
                    <li class="mb__menu-item">
                      <a href="#">
                        <span class="mb__menu-title">Layout</span>
                      </a>
                    </li>
                    <li class="mb__menu-item mb__sub-menu">
                      <a href="#">
                        <span class="mb__menu-title">Forms</span>
                      </a>
                      <div class="mb__sub-menu-list">
                        <ul>
                          <li class="mb__menu-item">
                            <a href="#">
                              <span class="mb__menu-title">Input</span>
                            </a>
                          </li>
                          <li class="mb__menu-item">
                            <a href="#">
                              <span class="mb__menu-title">Select</span>
                            </a>
                          </li>
                          <li class="mb__menu-item mb__sub-menu">
                            <a href="#">
                              <span class="mb__menu-title">More</span>
                            </a>
                            <div class="mb__sub-menu-list">
                              <ul>
                                <li class="mb__menu-item">
                                  <a href="#">
                                    <span class="mb__menu-title">CheckBox</span>
                                  </a>
                                </li>
                                <li class="mb__menu-item">
                                  <a href="#">
                                    <span class="mb__menu-title">Radio</span>
                                  </a>
                                </li>
                                <li class="mb__menu-item mb__sub-menu">
                                  <a href="#">
                                    <span class="mb__menu-title">Want more ?</span>
                                    <span class="mb__menu-suffix">&#x1F914;</span>
                                  </a>
                                  <div class="mb__sub-menu-list">
                                    <ul>
                                      <li class="mb__menu-item">
                                        <a href="#">
                                          <span class="mb__menu-prefix">&#127881;</span>
                                          <span class="mb__menu-title">You made it </span>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="mb__menu-item mb__sub-menu">
                <a href="#">
                  <span class="mb__menu-icon">
                    <i class="ri-bar-chart-2-fill"></i>
                  </span>
                  <span class="mb__menu-title">Charts</span>
                </a>
                <div class="mb__sub-menu-list">
                  <ul>
                    <li class="mb__menu-item">
                      <a href="#">
                        <span class="mb__menu-title">Pie chart</span>
                      </a>
                    </li>
                    <li class="mb__menu-item">
                      <a href="#">
                        <span class="mb__menu-title">Line chart</span>
                      </a>
                    </li>
                    <li class="mb__menu-item">
                      <a href="#">
                        <span class="mb__menu-title">Bar chart</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="mb__menu-header"><span> EXTRA </span></li>
              <li class="mb__menu-item">
                <a href="#">
                  <span class="mb__menu-icon">
                    <i class="ri-book-2-fill"></i>
                  </span>
                  <span class="mb__menu-title">Documentation</span>
                  <span class="mb__menu-suffix">
                    <span class="mb__badge mb__secondary">Beta</span>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <!-- <div class="mb__sidebar-footer">
          <div class="mb__footer-box"> -->
            <!-- <div>
              <img
                class="mb__react-logo"
                src="https://user-images.githubusercontent.com/25878302/213938106-ca8f0485-3f30-4861-9188-2920ed7ab284.png"
                alt="react"
              />
            </div> -->
            <!-- <div>
              <span>Demo Marbot</span>
            </div>
          </div> -->
        <!-- </div> -->
      </div>
      
    </aside>
    <div id="overlay" class="mb__overlay"></div>
    <div class="mb__layout">
      <main class="mb__content">
        <div>
          <a id="btn-toggle" href="#" class="mb__sidebar-toggler mb__break-point-sm">
            <i class="ri-menu-line ri-xl"></i>
          </a>
          <h1 class="text-info">Home Page</h1>
        </div>
        <footer class="mb__footer">
          <small style="margin-bottom: 20px; display: inline-block">
            © 2024 made with
            <span style="color: red; font-size: 18px">&#10084;</span> by -
            <a target="_blank" href="https://marbot.bo">Marbot</a>
          </small>
        </footer>
      </main>
      <div class="mb__overlay"></div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/Assets/keenicons/duotone/style.css";
@import "@/Assets/keenicons/outline/style.css";
@import "@/Assets/keenicons/solid/style.css";

/* Añade tus estilos aquí */

.ki-purchase .path1:before {
    opacity: 1;
  }
</style>
