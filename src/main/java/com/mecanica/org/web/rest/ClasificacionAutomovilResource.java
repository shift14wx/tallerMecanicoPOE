package com.mecanica.org.web.rest;

import com.mecanica.org.domain.ClasificacionAutomovil;
import com.mecanica.org.repository.ClasificacionAutomovilRepository;
import com.mecanica.org.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mecanica.org.domain.ClasificacionAutomovil}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClasificacionAutomovilResource {

    private final Logger log = LoggerFactory.getLogger(ClasificacionAutomovilResource.class);

    private static final String ENTITY_NAME = "clasificacionAutomovil";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClasificacionAutomovilRepository clasificacionAutomovilRepository;

    public ClasificacionAutomovilResource(ClasificacionAutomovilRepository clasificacionAutomovilRepository) {
        this.clasificacionAutomovilRepository = clasificacionAutomovilRepository;
    }

    /**
     * {@code POST  /clasificacion-automovils} : Create a new clasificacionAutomovil.
     *
     * @param clasificacionAutomovil the clasificacionAutomovil to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clasificacionAutomovil, or with status {@code 400 (Bad Request)} if the clasificacionAutomovil has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/clasificacion-automovils")
    public ResponseEntity<ClasificacionAutomovil> createClasificacionAutomovil(@RequestBody ClasificacionAutomovil clasificacionAutomovil) throws URISyntaxException {
        log.debug("REST request to save ClasificacionAutomovil : {}", clasificacionAutomovil);
        if (clasificacionAutomovil.getId() != null) {
            throw new BadRequestAlertException("A new clasificacionAutomovil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClasificacionAutomovil result = clasificacionAutomovilRepository.save(clasificacionAutomovil);
        return ResponseEntity.created(new URI("/api/clasificacion-automovils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /clasificacion-automovils} : Updates an existing clasificacionAutomovil.
     *
     * @param clasificacionAutomovil the clasificacionAutomovil to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clasificacionAutomovil,
     * or with status {@code 400 (Bad Request)} if the clasificacionAutomovil is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clasificacionAutomovil couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clasificacion-automovils")
    public ResponseEntity<ClasificacionAutomovil> updateClasificacionAutomovil(@RequestBody ClasificacionAutomovil clasificacionAutomovil) throws URISyntaxException {
        log.debug("REST request to update ClasificacionAutomovil : {}", clasificacionAutomovil);
        if (clasificacionAutomovil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClasificacionAutomovil result = clasificacionAutomovilRepository.save(clasificacionAutomovil);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clasificacionAutomovil.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /clasificacion-automovils} : get all the clasificacionAutomovils.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clasificacionAutomovils in body.
     */
    @GetMapping("/clasificacion-automovils")
    public List<ClasificacionAutomovil> getAllClasificacionAutomovils() {
        log.debug("REST request to get all ClasificacionAutomovils");
        return clasificacionAutomovilRepository.findAll();
    }

    /**
     * {@code GET  /clasificacion-automovils/:id} : get the "id" clasificacionAutomovil.
     *
     * @param id the id of the clasificacionAutomovil to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clasificacionAutomovil, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clasificacion-automovils/{id}")
    public ResponseEntity<ClasificacionAutomovil> getClasificacionAutomovil(@PathVariable Long id) {
        log.debug("REST request to get ClasificacionAutomovil : {}", id);
        Optional<ClasificacionAutomovil> clasificacionAutomovil = clasificacionAutomovilRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(clasificacionAutomovil);
    }

    /**
     * {@code DELETE  /clasificacion-automovils/:id} : delete the "id" clasificacionAutomovil.
     *
     * @param id the id of the clasificacionAutomovil to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/clasificacion-automovils/{id}")
    public ResponseEntity<Void> deleteClasificacionAutomovil(@PathVariable Long id) {
        log.debug("REST request to delete ClasificacionAutomovil : {}", id);
        clasificacionAutomovilRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
