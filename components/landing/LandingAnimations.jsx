  "use client";

  import { useEffect } from "react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  export default function LandingAnimations() {
    useEffect(() => {
      if (typeof window === "undefined") return;

      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const prefersReducedMotion = reducedMotionQuery.matches;

      gsap.registerPlugin(ScrollTrigger);

      if (prefersReducedMotion) {
        const visionTitle = document.querySelector("[data-vision-title]");
        const visionDescription = document.querySelector("[data-vision-description]");
        const sourceWrap = document.querySelector("[data-viziune-card-source-wrap]");
        const sourceCard = document.querySelector("[data-viziune-card-source]");
        const servicesCard = document.querySelector("[data-servicii-card]");

        if (visionTitle) {
          gsap.set(visionTitle, { x: 0, autoAlpha: 1 });
        }
        if (visionDescription) {
          gsap.set(visionDescription, { x: 0, autoAlpha: 1 });
        }
        if (sourceWrap && sourceCard) {
          gsap.set(sourceWrap, { xPercent: 0, yPercent: 0, opacity: 1, visibility: "visible" });
          gsap.set(sourceCard, { scale: 1, rotate: 0 });
        }
        if (servicesCard) {
          gsap.set(servicesCard, { xPercent: 0, y: 0, opacity: 1 });
        }
        return;
      }

      const isMobile = window.innerWidth < 768;
      const revealY = isMobile ? 36 : 60;
      const sectionY = isMobile ? 36 : 64;
      const footerY = isMobile ? 36 : 56;

      const cleanups = [];
      const ctx = gsap.context(() => {
        const offerCards = gsap.utils.toArray("[data-offer-card]");
        const offerStack = document.querySelector("[data-offer-stack]");
        if (offerCards.length) {
          gsap.set(offerCards, { autoAlpha: 0, y: revealY });
        }

        const sectionSequence = gsap.utils.toArray(".snap-section");
        sectionSequence.forEach((section, index) => {
          gsap.fromTo(
            section,
            { autoAlpha: 0, y: sectionY },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: index === 0 ? "top 96%" : "top 88%",
                once: true,
              },
            }
          );
        });

        const footer = document.querySelector("#contact");
        if (footer) {
          gsap.fromTo(
            footer,
            { autoAlpha: 0, y: footerY },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: footer,
                start: "top 90%",
                once: true,
              },
            }
          );
        }

        const dotsPattern = document.querySelector("[data-parallax='dots']");
        if (dotsPattern) {
          gsap.to(dotsPattern, {
            yPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });
        }

        const visionSection = document.querySelector("#despre-noi");
        const visionTitle = document.querySelector("[data-vision-title]");
        const visionDescription = document.querySelector("[data-vision-description]");
        const visionSourceWrap = document.querySelector("[data-viziune-card-source-wrap]");
        const visionSourceCard = document.querySelector("[data-viziune-card-source]");
        if (visionSection && visionSourceWrap && visionSourceCard && visionTitle && visionDescription) {
          const resetVisionToHidden = () => {
            gsap.set(visionSourceWrap, {
              x: Math.min(window.innerWidth * 0.56, 720),
              autoAlpha: 0,
            });
            gsap.set(visionSourceCard, { scale: 0.975, rotate: 1.5 });
            gsap.set(visionTitle, {
              x: -Math.min(window.innerWidth * 0.38, 500),
              autoAlpha: 0,
            });
            gsap.set(visionDescription, {
              x: -Math.min(window.innerWidth * 0.32, 420),
              autoAlpha: 0,
            });
          };

          gsap.set([visionTitle, visionDescription, visionSourceWrap, visionSourceCard], {
            transformPerspective: 1000,
            force3D: true,
            backfaceVisibility: "hidden",
            willChange: "transform, opacity",
          });
          resetVisionToHidden();

          const visionEnterTl = gsap.timeline({
            paused: true,
            scrollTrigger: {
              trigger: visionSection,
              start: "top 80%",
              toggleActions: "restart none none none",
              invalidateOnRefresh: true,
              refreshPriority: 2,
            },
          });

          visionEnterTl
            .fromTo(
              visionSourceWrap,
              {
                x: () => Math.min(window.innerWidth * 0.56, 720),
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                duration: 1.45,
                ease: "power3.out",
              },
              0.15
            )
            .fromTo(
              visionSourceCard,
              { scale: 0.975, rotate: 1.5 },
              {
                scale: 1,
                rotate: 0,
                duration: 1.52,
                ease: "power3.out",
              },
              0.15
            )
            .fromTo(
              visionTitle,
              {
                x: () => -Math.min(window.innerWidth * 0.38, 500),
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                duration: 1.42,
                ease: "power3.out",
              },
              0.25
            )
            .fromTo(
              visionDescription,
              {
                x: () => -Math.min(window.innerWidth * 0.32, 420),
                autoAlpha: 0,
              },
              {
                x: 0,
                autoAlpha: 1,
                duration: 1.40,
                ease: "power3.out",
              },
            0.45
          );

          ScrollTrigger.create({
            trigger: visionSection,
            start: "top 102%",
            invalidateOnRefresh: true,
            onLeaveBack: () => {
              resetVisionToHidden();
              visionEnterTl.pause(0);
            },
          });

          const refreshAfterAssets = () => ScrollTrigger.refresh();
          const visionImages = Array.from(document.querySelectorAll("[data-viziune-image]"));
          const pendingImageHandlers = [];
          visionImages.forEach((image) => {
            if (image.complete) return;
            const onLoad = () => refreshAfterAssets();
            image.addEventListener("load", onLoad, { once: true });
            pendingImageHandlers.push({ image, onLoad });
          });
          window.addEventListener("load", refreshAfterAssets);
          window.requestAnimationFrame(() => ScrollTrigger.refresh());
          cleanups.push(() => {
            window.removeEventListener("load", refreshAfterAssets);
            pendingImageHandlers.forEach(({ image, onLoad }) =>
              image.removeEventListener("load", onLoad)
            );
          });
        }

        const servicesCard = document.querySelector("[data-servicii-card]");
        if (servicesCard) {
          gsap.set(servicesCard, {
            force3D: true,
            backfaceVisibility: "hidden",
            willChange: "transform, opacity",
          });

          gsap.fromTo(
            servicesCard,
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: "#servicii-esentiale",
                start: "top 76%",
                once: true,
              },
            }
          );
        }

        // ── Offer cards scroll reveal (stagger) ──────────────────────────────
        if (offerCards.length && offerStack) {
          const resetOfferCardsToHidden = () => {
            gsap.set(offerCards, { y: revealY, autoAlpha: 0 });
          };

          const offerRevealTween = gsap.fromTo(
            offerCards,
            { y: revealY, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.0,
              ease: "power3.out",
              stagger: 0.18,
              scrollTrigger: {
                trigger: offerStack,
                start: "top 82%",
                toggleActions: "restart none none none",
                invalidateOnRefresh: true,
              },
            }
          );

          ScrollTrigger.create({
            trigger: offerStack,
            start: "top 102%",
            invalidateOnRefresh: true,
            onLeaveBack: () => {
              resetOfferCardsToHidden();
              offerRevealTween.pause(0);
            },
          });
        }

        // ── Services section header reveal ───────────────────────────────────
        const servicesHeader = document.querySelector("#servicii-esentiale [data-reveal]");
        if (servicesHeader) {
          const servicesSection = servicesHeader.closest("section");
          const resetServicesHeaderToHidden = () => {
            gsap.set(servicesHeader, { y: revealY, autoAlpha: 0 });
          };

          gsap.set(servicesHeader, { y: revealY, autoAlpha: 0 });
          const servicesHeaderTween = gsap.fromTo(
            servicesHeader,
            { y: revealY, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: servicesHeader,
                start: "top 88%",
                toggleActions: "restart none none none",
                invalidateOnRefresh: true,
              },
            }
          );

          if (servicesSection) {
            ScrollTrigger.create({
              trigger: servicesSection,
              start: "top 102%",
              invalidateOnRefresh: true,
              onLeaveBack: () => {
                resetServicesHeaderToHidden();
                servicesHeaderTween.pause(0);
              },
            });
          }
        }

        // ── CTA section timeline (#implicare-cta) ─────────────────────────────
        const ctaSection = document.querySelector("#implicare-cta");
        if (ctaSection) {
          const ctaReveals = gsap.utils.toArray("[data-reveal]", ctaSection);
          const ctaButtons = ctaSection.querySelector("[data-stagger-group]");
          const ctaElements = [ctaReveals[0], ctaButtons, ctaReveals[1], ctaReveals[2]].filter(Boolean);
          if (ctaElements.length) {
            const resetCtaToHidden = () => {
              gsap.set(ctaElements, { y: revealY, autoAlpha: 0 });
            };

            gsap.set(ctaElements, { y: revealY, autoAlpha: 0 });
            const ctaTl = gsap.timeline({
              scrollTrigger: {
                trigger: ctaReveals[0],
                start: "top 88%",
                toggleActions: "restart none none none",
                invalidateOnRefresh: true,
              },
            });
            ctaTl
              .fromTo(ctaReveals[0], { y: revealY, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.0, ease: "power3.out" }, 0)
              .fromTo(ctaButtons, { y: revealY, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.0, ease: "power3.out" }, 0.15)
              .fromTo(ctaReveals[1], { y: revealY, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.0, ease: "power3.out" }, 0.30)
              .fromTo(ctaReveals[2], { y: revealY, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.0, ease: "power3.out" }, 0.45);

            ScrollTrigger.create({
              trigger: ctaSection,
              start: "top 102%",
              invalidateOnRefresh: true,
              onLeaveBack: () => {
                resetCtaToHidden();
                ctaTl.pause(0);
              },
            });
          }
        }

        // ── Echipa section header + team cards reveal ────────────────────────
        const echipaSection = document.querySelector("#echipa");
        if (echipaSection) {
          const echipaHeader = echipaSection.querySelector("[data-reveal]");
          let echipaHeaderTween = null;
          if (echipaHeader) {
            gsap.set(echipaHeader, { y: revealY, autoAlpha: 0 });
            echipaHeaderTween = gsap.fromTo(
              echipaHeader,
              { y: revealY, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 1.0,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: echipaHeader,
                  start: "top 88%",
                  toggleActions: "restart none none none",
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          const teamCards = gsap.utils.toArray("[data-stagger-item]", echipaSection);
          const teamGrid = echipaSection.querySelector("[data-stagger-group]");
          let teamCardsTween = null;
          if (teamCards.length && teamGrid) {
            gsap.set(teamCards, { y: revealY, autoAlpha: 0 });
            teamCardsTween = gsap.fromTo(
              teamCards,
              { y: revealY, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 1.0,
                ease: "power3.out",
                stagger: 0.18,
                scrollTrigger: {
                  trigger: teamGrid,
                  start: "top 88%",
                  toggleActions: "restart none none none",
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          if (echipaHeaderTween || teamCardsTween) {
            ScrollTrigger.create({
              trigger: echipaSection,
              start: "top 102%",
              invalidateOnRefresh: true,
              onLeaveBack: () => {
                if (echipaHeader) {
                  gsap.set(echipaHeader, { y: revealY, autoAlpha: 0 });
                  echipaHeaderTween?.pause(0);
                }
                if (teamCards.length) {
                  gsap.set(teamCards, { y: revealY, autoAlpha: 0 });
                  teamCardsTween?.pause(0);
                }
              },
            });
          }
        }

        // ── Press items scroll reveal (stagger) ──────────────────────────────
        const pressSection = document.querySelector("#presa");
        if (pressSection) {
          const pressItems = gsap.utils.toArray("[data-stagger-item]", pressSection);
          if (pressItems.length) {
            gsap.set(pressItems, { y: revealY, autoAlpha: 0 });
            const pressTween = gsap.fromTo(
              pressItems,
              { y: revealY, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 1.0,
                ease: "power3.out",
                stagger: 0.15,
                scrollTrigger: {
                  trigger: pressSection.querySelector("[data-stagger-group]"),
                  start: "top 88%",
                  toggleActions: "restart none none none",
                  invalidateOnRefresh: true,
                },
              }
            );

            ScrollTrigger.create({
              trigger: pressSection,
              start: "top 102%",
              invalidateOnRefresh: true,
              onLeaveBack: () => {
                gsap.set(pressItems, { y: revealY, autoAlpha: 0 });
                pressTween.pause(0);
              },
            });
          }
        }
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
        ctx.revert();
      };
    }, []);

    return null;
  }
